import { Sequelize, Model, DataTypes } from 'sequelize';

type SettingAttributes = {
  key: string;
  value: string;
};

class Setting extends Model<SettingAttributes> implements SettingAttributes {
  public key!: string;
  public value!: string;
}

export default (sequelize: Sequelize) => {
  Setting.init(
    {
      key: {
        type: DataTypes.STRING,
        allowNull: false,
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
