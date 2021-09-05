import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

type SettingAttributes = {
  id: string;
  key: string;
  description?: string;
  value: string;
};

type SettingCreationAttributes = Optional<SettingAttributes, 'id'>;

class Setting extends Model<SettingAttributes, SettingCreationAttributes> implements SettingAttributes {
  public id!: string;
  public key!: string;
  public description!: string;
  public value!: string;
}

export default (sequelize: Sequelize) => {
  Setting.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['key'],
        },
      ],
      sequelize,
      tableName: 'settings',
      timestamps: false,
    },
  );

  return Setting;
};
