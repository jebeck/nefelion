import Chance from 'chance';

const chance = Chance();

function animateBirdFlying(tl, selector) {
  const delay = chance.integer({ min: -5, max: -1 });
  const duration = chance.floating({ min: 2, max: 3.5 });
  const birdSelector = `#Birds ${selector}`;

  tl
    .add(
      TweenMax.to(birdSelector, duration, {
        delay,
        ease: Power1.easeInOut,
        repeat: -1,
        y: -10,
        yoyo: true,
      }),
      'start_draw'
    )
    .add(
      TweenMax.to(birdSelector, duration, {
        delay,
        ease: Power1.easeInOut,
        morphSVG: `#Birds--Flying ${selector}--Flying`,
        repeat: -1,
        yoyo: true,
      }),
      'done_draw'
    );
}

function makeBirdTimeline(selector, idx) {
  const isLarge = selector === '#Large';

  const bird = new TimelineMax();
  const startLabel = `start_bird_draw_${selector
    .replace('#', '')
    .toLowerCase()}`;
  const doneLabel = `done_bird_draw_${selector.replace('#', '').toLowerCase()}`;
  const birdSelector = `#Birds ${selector}`;
  bird
    .add(startLabel)
    .add(
      TweenMax.to(birdSelector, 0.25, {
        strokeOpacity: 1,
      }),
      startLabel
    )
    .add(
      TweenMax.fromTo(
        birdSelector,
        1,
        { drawSVG: isLarge ? '100% 100%' : '0' },
        {
          delay: idx * 0.25,
          drawSVG: isLarge ? '0 100%' : '100%',
          ease: Linear.easeNone,
        }
      ),
      startLabel
    )
    .add(doneLabel);

  return bird;
}

function makeLinesTimeline() {
  const lines = new TimelineMax();

  lines
    .add(
      TweenMax.fromTo(
        '#Line--Top',
        2.5,
        { drawSVG: '0' },
        { drawSVG: '100%', ease: Power1.easeInOut, strokeOpacity: 1 }
      ),
      'start_draw'
    )
    .add(
      TweenMax.fromTo(
        '#Line--Bottom',
        2.5,
        { drawSVG: '100% 100%' },
        { drawSVG: '0 100%', ease: Power1.easeInOut, strokeOpacity: 1 }
      ),
      'start_draw'
    );

  return lines;
}

function makeSunTimeline() {
  const drawSun = new TimelineMax();

  drawSun
    .add('start_sun_draw')
    .add(
      TweenMax.to('#OuterSun-Stroke, #InnerSun-Stroke', 0.25, {
        ease: Power1.easeInOut,
        strokeOpacity: 1,
      }),
      'start_sun_draw'
    )
    .add(
      TweenMax.fromTo(
        '#OuterSun-Stroke',
        1.5,
        { drawSVG: '0' },
        { drawSVG: '100%', ease: Linear.easeNone, strokeOpacity: 1 }
      ),
      'start_sun_draw'
    )
    .add(
      TweenMax.fromTo(
        '#InnerSun-Stroke',
        1.25,
        { drawSVG: '100% 100%' },
        {
          delay: 0.5,
          drawSVG: '0 100%',
          ease: Linear.easeNone,
          strokeOpacity: 1,
        }
      ),
      'start_sun_draw'
    )
    .add('done_sun_draw')
    .add(
      TweenMax.fromTo(
        '#OuterSun-Fill',
        1.5,
        { fillOpacity: 0 },
        { fillOpacity: 0.5 }
      ),
      'done_sun_draw'
    )
    .add(
      TweenMax.fromTo(
        '#InnerSun-Fill',
        1.25,
        { fillOpacity: 0 },
        { fillOpacity: 0.2 }
      ),
      'done_sun_draw'
    );

  return drawSun;
}

export function mount() {
  const tl = new TimelineMax();

  tl
    .add('start_draw')
    .add(makeSunTimeline(), 'start_draw')
    .add(TweenMax.to('.Circles-Fill', 2.5, { fillOpacity: 0.6 }), 'start_draw')
    .add(makeLinesTimeline(), 'start_draw')
    .add(
      TweenMax.fromTo(
        '.CirclesStroke--Lower',
        1.75,
        { drawSVG: '0' },
        { drawSVG: '100%', ease: Power1.easeInOut, strokeOpacity: 1 }
      ),
      'start_draw'
    )
    .add('done_draw')
    .add(
      TweenMax.fromTo(
        '.CirclesStroke--Upper',
        1.75,
        { drawSVG: '0' },
        { drawSVG: '100%', ease: Power1.easeInOut, strokeOpacity: 0.5 }
      ),
      'done_draw'
    )
    .to(
      '#OuterSun',
      25,
      {
        delay: -1,
        ease: Linear.easeNone,
        repeat: -1,
        rotation: 360,
        transformOrigin: '50% 50%',
      },
      0
    )
    .to(
      '#InnerSun',
      20,
      {
        delay: -1,
        ease: Linear.easeNone,
        repeat: -1,
        rotation: -360,
        transformOrigin: '50% 50%',
      },
      0
    )
    .to(
      '#☁️',
      1.75,
      {
        delay: -1,
        ease: Power1.easeInOut,
        repeat: -1,
        y: '-=7.5',
        yoyo: true,
      },
      0
    );

  ['#Small', '#Medium', '#Large'].forEach((selector, i) => {
    tl.add(makeBirdTimeline(selector, i), 'start_draw');
  });

  ['#Small', '#Medium', '#Large'].forEach(selector => {
    animateBirdFlying(tl, selector);
  });

  function yoyoDraw(selector, duration, delay) {
    return TweenMax.fromTo(
      selector,
      duration,
      { drawSVG: '100%' },
      {
        delay,
        drawSVG: '0',
        ease: Power1.easeInOut,
        repeat: -1,
        yoyo: true,
      }
    );
  }

  ['Right', 'Full', 'Left'].forEach((key, i) => {
    tl.add(yoyoDraw(`#CircleStroke--${key}`, 4 - i, i + 1), 'done_draw');
  });

  return tl;
}
