[MediatR](https://github.com/jbogard/MediatR) is **.NET** library for in-process messaging created by [Jimmy Bogart](https://jimmybogard.com/), who is also the author of other popular libraries, such as [AutoMapper](https://github.com/AutoMapper/AutoMapper). 

The goal of this article is not to explain what **MediatR** is and how it works, it is best described by Jimmy in [this youtube video](https://www.youtube.com/watch?v=SUiWfhAhgQw&t). So following from now on it is assumed that the reader of this article already knows the basics about **MediatR**. The main goal of this article is to show *pipeline behavior* functionality and how to use it in your project.

## Behaviors

Pipeline behaviors are tools to alter the behavior of the *request* before it hits its *handler*. They function on the classical pipeline principle, meaning you can do some action before then send a request to the next pipeline, and after it returns do something after. Below you can see a generic example of this principle.

```csharp
public class MyBehavior<TRequest, TResponse> 
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    public async Task<TResponse> Handle(
        TRequest request, 
        CancellationToken cancellationToken, 
        RequestHandlerDelegate<TResponse> next)
    {
        await DoBefore(cancellationToken);
        var response = await next();
        await DoAfter(cancellationToken);
        
        return response;
    }
}
```

You can restrict which *requests* the behavior will be applied to. For example, in the segment below this behavior will be applied only to requests that implement the `IInTransaction` interface. So this interface opens transaction for every request that implements the `IInTransaction` interface and then, depending on if an **exception** has been thrown or not, commits or rolls back said transaction. 

```csharp
public class TransactionBehavior<TRequest, TResponse> 
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IInTransaction
{
    private readonly DatabaseContext context;

    public TransactionBehavior(DatabaseContext context)
    {
        this.context = context;
    }

    public async Task<TResponse> Handle(
        TRequest request, 
        CancellationToken cancellationToken, 
        RequestHandlerDelegate<TResponse> next)
    {
        var transaction = await context.Database.BeginTransactionAsync(cancellationToken);
        try
        {
            var response = await next();
            await transaction.CommitAsync(cancellationToken);
            return response;
        }
        catch
        {
            await transaction.RollbackAsync(cancellationToken);
            throw;
        }
        
        return response;
    }
}
```

Behaviors can be added to the *dependency injection container* (*DI*) by simply registering them as open generic scoped services.

```csharp
services.AddTransient(typeof(IPipelineBehavior<,>), typeof(TransactionBehavior<,>));
```

## RequestProcessors

**MediatR** package comes with some predefined behaviors - `RequestPreProcessorBehavior` and `RequestPostProcessorBehavior`. Those are behaviors that cover actions before respectively after the *request* is handled. Those *behaviors* are registered automatically with **MeditR** to *DI* and by default don't do anything because don't have any actions registered. 

You can register this pre/post processor action by implementing `IRequestPreProcessor<TRequest>`/`IRequestPostProcessor<TRequest>` interface. These actions will get automatically registered into *DI* too. Below we can see an example of the `IRequestPreProcessor` that receives an array of validators of concrete *request* implementing an `IValidable` interface a performs validation for each validator. 

```csharp
public class RequestValidationPreprocessor<TRequest> 
    : IRequestPreProcessor<TRequest>
    where TRequest : IValidable
{
    private readonly IEnumerable<IValidator<TRequest>> validators;

    public RequestValidationPreprocessor(IEnumerable<IValidator<TRequest>> validators)
    {
        this.validators = validators;
    }

    public async Task Process(TRequest request, CancellationToken cancellationToken)
    {
        foreach(var validator in validators)
            await validator.ValidateAsync(request);
    }
}
```

## Conclusion

**MediatR** is a widely used library and *behaviors* are convenient tools to be used for with its basic functionality. I encourage you to read more about **MediatR** and try to use it in your projects too 😉.