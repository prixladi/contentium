import { Sequelize, Model, DataTypes } from 'sequelize';

type SettingAttributes = {
  key: string;
  description?: string;
  value: string;
};

class Setting extends Model<SettingAttributes> implements SettingAttributes {
  public key!: string;
  public description!: string;
  public value!: string;
}

export default (sequelize: Sequelize) => {
  Setting.init(
    {
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'settings',
      timestamps: false,
    },
  );

  return Setting;
};
