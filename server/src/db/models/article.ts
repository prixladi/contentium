import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

type ArticleAttributes = {
  id: string;
  title: string;
  content: string;
  highlighted: boolean;
  keyworkText?: string | null;
  brief?: string | null;
  author?: string | null;
  createdAt?: string | null;
  readingTimeInMinutes?: number | null;
};

type ArticleCreationAttributes = Optional<ArticleAttributes, 'id'>;

class Article extends Model<ArticleAttributes, ArticleCreationAttributes> implements ArticleAttributes {
  public id!: string;
  public title!: string;
  public content!: string;
  public highlighted!:  boolean;

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
        unique: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      highlighted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
        allowNull: true,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      readingTimeInMinutes: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['title'],
        },
        {
          fields: ['createdAt'],
        },
      ],
      sequelize,
      tableName: 'articles',
      timestamps: false,
    },
  );

  return Article;
};
