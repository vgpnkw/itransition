const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()


// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 1 символ')
      .isLength({ min: 1 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при регистрации'
      })
    }

    const {name, email, password} = req.body
    //console.log(name)

    const candidate = await User.findOne({ where: 
      {
        email: email,
        name: name
      }
    });

    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email: email, password: hashedPassword, name: name, register_date: new Date, block: false, last_login_date: new Date});

    await user.save();

    res.status(201).json({ message: 'Пользователь создан' })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при входе в систему'
      })
    }

    const {name, email, password} = req.body

    const user = await User.findOne({ where: 
      {
        email: email,
        name: name
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }
    const isBlock = await user.block;
    if (isBlock) {
      return res.status(400).json({ message: 'You are banned' });
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
    }

    User.update({ last_login_date: new Date }, {
      where: {
        email: email
      }
    })

    const token = jwt.sign(
      { userId: user.id },
      "gapankow witaly",
      { expiresIn: '1h' }
    )


    res.json({ token, userId: user.id })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


module.exports = router