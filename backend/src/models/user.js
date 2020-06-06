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
  avatar: {
    type: DataTypes.STRING,
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
  birthday: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  vkId: {
    type: DataTypes.BIGINT,
    defaultValue: null
  },
  telegramId: {
    type: DataTypes.BIGINT,
    unique: true,
    defaultValue: null
  }

}, {
  underscored: true,
  sequelize,
  modelName: 'users',
});

export class Project extends Model {
}

Project.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  projectType: {
    type: DataTypes.ENUM(['Социальный проект', 'Общественная инициатива', 'Инициатива органов власти', 'Жалоба', 'Петиция']),
    allowNull: false
  },
  shortDescription: {
    type: DataTypes.STRING(300),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(1500),
  },
  category: {
    type: DataTypes.ARRAY(DataTypes.ENUM(['Технологии', 'Культурное наследие', 'Строительство', 'Наука и инновации', 'Медицина'
      , 'Гос. услуги', 'Мой район', 'Туризм', 'ЖКХ', 'Экономика и бизнес', 'Транспорт', 'Ветеринария', 'Образование'
      , 'Электронный дом', 'Благоустройство', 'Торговля и услуги', 'Социальная сфера', 'IT-технологии', 'Экология'
      , 'Культура', 'Парки, зеленые зоны', 'Спорт', 'Город', 'Городские мероприятия'])),
    allowNull: false
  },
  resources: {
    type: DataTypes.STRING,
    allowNull: false
  },
  thanks: {
    type: DataTypes.STRING
  },
  deadline: {
    type: DataTypes.DATE,
  },
  files: {
    type: DataTypes.STRING,
    defaultValue: null
  }
}, {
  underscored: true,
  sequelize,
  modelName: 'projects',
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

export class Like extends Model {
}

Like.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  reputation: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.BIGINT,
    allowNull: false
  }
}, {
  underscored: true,
  sequelize,
  modelName: 'likes',
});


User.hasMany(Referral);
Referral.belongsTo(User);

User.hasMany(Project, {onDelete: 'CASCADE'});
Project.belongsTo(User);

Project.hasMany(Like, {onDelete: 'CASCADE'});
Like.belongsTo(Project);