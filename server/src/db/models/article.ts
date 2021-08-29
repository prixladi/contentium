import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

type ArticleAttributes = {
  id: string;
  title: string;
  brief: string | null;
  content: string;
};

type UserCreationAttributes = Optional<ArticleAttributes, 'id'>;

class Article extends Model<ArticleAttributes, UserCreationAttributes> implements ArticleAttributes {
  public id!: string;
  public title!: string;
  public brief!: string | null;
  public content!: string;
}

export default (sequelize: Sequelize) => {
  Article.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      brief: {
        type: DataTypes.STRING(512),
        allowNull: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'articles',
      timestamps: false,
    },
  );

  return Article;
};
