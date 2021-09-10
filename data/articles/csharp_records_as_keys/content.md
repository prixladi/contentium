New **C# 9** feature [records](https://docs.microsoft.com/dotnet/csharp/whats-new/tutorials/records) can easily be used as key in *hash* structures such as `IDictionary<TKey, TValue>`, thanks to them by default implementing `IEquatable<>`. Of course **classes** can be used as keys too but you either compare by reference which is not desirable in many cases or you need to implement `IEquatable<>` by yourself.

## Example

```csharp
public record Key 
{
    public string Title { get; init; }
    public string Batch { get; init; }
}

var distinctArticles = new HashSet<Key>();

foreach(var article in articles)
    distincArticles.Add(new Key 
    { 
        Title = article.Title, 
        Batch = article.Batch  
    });
```
