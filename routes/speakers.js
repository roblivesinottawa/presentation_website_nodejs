const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const speakersService = params;

  router.get('/', async (req, res) => {
    const speakers = await speakersService.getList();
    return res.json(speakers);
  });

  // eslint-disable-next-line arrow-body-style
  router.get('/:shortname', (req, res) => {
    return res.send(`detail page of ${req.params.shortname}`);
  });

  return router;
};
