import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

type ArticleAttributes = {
  id: string;
  title: string;
  content: string;
  keyworkText?: string | null,
  brief?: string | null;
  author?: string | null;
  createdAt?: string | null;
  readingTimeInMinutes?: number | null;
};

type UserCreationAttributes = Optional<ArticleAttributes, 'id'>;

class Article extends Model<ArticleAttributes, UserCreationAttributes> implements ArticleAttributes {
  public id!: string;
  public title!: string;
  public content!: string;

  public keyworkText!: string | null;
  public brief!: string | null;
  public createdAt!: string | null;
  public author?: string | null;
  public readingTimeInMinutes!: number | null;
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
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      keyworkText: {
        type: DataTypes.STRING(512),
        allowNull: true,
      },
      brief: {
        type: DataTypes.STRING(512),
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
      author: {
        type: DataTypes.STRING,
        allowNull: true
      },
      readingTimeInMinutes: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'articles',
      timestamps: false,
    },
  );

  return Article;
};
