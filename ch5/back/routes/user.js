const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../models');

const router = express.Router();

router.get('/', (req, res) => {
  // /api/user
});
router.post('/', async (req, res, next) => {
  console.log(req.body);
  // POST /api/user 회원가입
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12); // salt는 10~13 사이로
    const newUser = await db.User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashedPassword,
    });
    console.log(newUser);
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    // return res.status(403).send(e);
    // 에러 처리
    return next(e);
  }
});
router.get('/:id', (req, res) => {});
router.post('/logout', (req, res) => {});
router.post('/login', (req, res) => {});
router.get('/:id/folow', (req, res) => {});
router.post('/:id/follow', (req, res) => {});
router.delete('/:id/follow', (req, res) => {});
router.delete('/:id/follower', (req, res) => {});
router.get('/:id/posts', (req, res) => {});

module.exports = router;
