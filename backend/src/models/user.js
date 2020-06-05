const {Model, DataTypes} = require('sequelize');

import sequelize from "../config/database";

export class User extends Model {
}

User.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  patronymic: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  gender: {
    type: DataTypes.ENUM(['Мужской', 'Женский']),
    defaultValue: null
  },
  information: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  projectDescription: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  interests: {
    type: DataTypes.ARRAY(DataTypes.ENUM(['Технологии', 'Культурное наследие', 'Строительство', 'Наука и инновации', 'Медицина'
      , 'Гос. услуги', 'Мой район', 'Туризм', 'ЖКХ', 'Экономика и бизнес', 'Транспорт', 'Ветеринария', 'Образование'
      , 'Электронный дом', 'Благоустройство', 'Торговля и услуги', 'Социальная сфера', 'IT-технологии', 'Экология'
      , 'Культура', 'Парки, зеленые зоны', 'Спорт', 'Город', 'Городские мероприятия'])),
    defaultValue: null
  },
  zipCode: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  city: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  areaCity: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  areaRegion: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  street: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  socialPosition: {
    type: DataTypes.ENUM(['Студент', 'Работаю', 'Временно не работаю']),
    defaultValue: null
  },
  phone: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  vkLink: {
    type: DataTypes.STRING,
    defaultValue: null,
    validate: {
      isUrl: true
    }
  },
  youtubeLink: {
    type: DataTypes.STRING,
    defaultValue: null,
    validate: {
      isUrl: true
    }
  },
  instagramLink: {
    type: DataTypes.STRING,
    defaultValue: null,
    validate: {
      isUrl: true
    }
  },
  twitterLink: {
    type: DataTypes.STRING,
    defaultValue: null,
    validate: {
      isUrl: true
    }
  },
  facebookLink: {
    type: DataTypes.STRING,
    defaultValue: null,
    validate: {
      isUrl: true
    }
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  rating: {
    type: DataTypes.ENUM(['Активист', 'Лидер мнений', 'Амбассадор']),
    defaultValue: 'Активист'
  },
  vkId: {
    type: DataTypes.BIGINT,
    defaultValue:null
  }

}, {
  underscored: true,
  sequelize,
  modelName: 'users',
});

export class Referral extends Model {
}

Referral.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
}, {
  underscored: true,
  sequelize,
  modelName: 'referrals',
});

User.hasMany(Referral);
Referral.belongsTo(User);