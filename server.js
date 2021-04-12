/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

const routes = require('./routes');

const app = express();
const port = 5000;

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['Goishsoodhd', 'hdjiehkjdbuwq'],
  })
);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'ROUX MEETUPS';

app.use(express.static(path.join(__dirname, './static')));

app.use(async (req, res, next) => {
  try {
    const names = await speakersService.getNames();
    res.locals.speakersNames = names;

    return next();
  } catch (error) {
    return next();
  }
});

app.use(
  '/',
  routes({
    feedbackService,
    speakersService,
  })
);

app.use('/', routes());
app.listen(port, () => console.log(`server listening on port ${port}`));
