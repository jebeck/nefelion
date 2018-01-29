import React from 'react';
import PropTypes from 'prop-types';

import FadeInOut from 'components/utils/FadeInOut';
import TextPage from 'styled/TextPage';
import wrapPage from 'hoc/wrapPage';
import Divider from 'styled/Divider';

const About = props => {
  const { pathname, status } = props;
  return (
    <FadeInOut pathname={pathname} status={status}>
      <TextPage context="default" text>
        <h1>about nefelion</h1>
        <p>
          Let me start a bit too philosophically: the Internet is currently
          being overtaken by data services. We have our dedicated fitness
          trackers:{' '}
          <a href="https://www.fitbit.com/" title="Fitbit">
            Fitbits
          </a>{' '}
          and{' '}
          <a href="https://jawbone.com/" title="Jawbone">
            Jawbones
          </a>{' '}
          and{' '}
          <a href="https://misfit.com/" title="Misfit">
            Misfits
          </a>. Our GPS-enabled fitness trackers from{' '}
          <a
            href="https://buy.garmin.com/en-US/US/c10002-p1.html"
            title="Garmin Wearables"
          >
            Garmin
          </a>{' '}
          and similar. We have our WiFi-enabled health devices like the{' '}
          <a href="http://www.withings.com/us/en/" title="Withings">
            Withings
          </a>{' '}
          bodyweight scale, blood pressure monitor, &amp;c. And we have our
          all-in-ones like the{' '}
          <a href="http://www.apple.com/watch/" title="Apple Watch">
            Apple Watch
          </a>{' '}
          and the{' '}
          <a href="https://www.pebble.com/" title="Pebble">
            Pebble
          </a>
          <sup>
            <a id="ffn1" href="#fn1" class="footnote">
              1
            </a>
          </sup>.
        </p>
        <p>
          Apple&#39;s iOS{' '}
          <a
            href="https://developer.apple.com/healthkit/"
            title="Apple Developer Portal: HealthKit"
          >
            HealthKit
          </a>{' '}
          is the one &quot;native&quot; all-in-one repository for all—or very
          nearly all—data being gathered by all these devices, but it&#39;s not
          a very <em>accessible</em> repository. There&#39;s no REST API; in
          fact, there&#39;s no HTTP access model at all: access is only via iOS
          SDK from a native application installed and running on the data
          owner&#39;s iOS device. In our current era of a robust, mature
          Internet and all of the standards it includes (e.g.,{' '}
          <a
            href="https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol"
            title="Wikipedia: HTTP"
          >
            HTTP
          </a>{' '}
          as a standard communication protocol on the{' '}
          <a
            href="https://en.wikipedia.org/wiki/World_Wide_Web"
            title="Wikipedia: World Wide Web"
          >
            World Wide Web
          </a>), it’s actually hard to imagine a <em>less</em> accessible data
          repository.<sup>
            <a id="ffn2" href="#fn2" class="footnote">
              2
            </a>
          </sup>
        </p>
        <p>
          So what can a person—a person like me, with both a{' '}
          <a
            href="https://en.wikipedia.org/wiki/Diabetes_mellitus_type_1"
            title="Wikipedia: Diabetes mellitus, type 1"
          >
            data-intensive chronic illness
          </a>{' '}
          and an interest in{' '}
          <a href="http://quantifiedself.com/" title="Quantified Self">
            self-quantification
          </a>{' '}
          generally—do to access all her data in a single repository and review
          it in aggregate as well as in detailed views? There&#39;s{' '}
          <a href="https://gyrosco.pe/" title="Gyroscope">
            Gyroscope
          </a>, which (in the Pro version) aggregates a user&#39;s entire
          HealthKit data repository as well as a bunch of other data sources,
          including{' '}
          <a href="https://www.rescuetime.com/" title="RescueTime">
            RescueTime
          </a>, and provides both a web-based application and an iOS app for
          reviewing data both from a detailed, daily perspective and across
          longer timespans.
        </p>
        <p>
          But Gyroscope doesn&#39;t integrate diabetes data; this isn&#39;t a
          surprise given the rarity of type 1 diabetes. So I&#39;m left back at
          square one, and the only true solution left for me to store and view
          my data in the ways <strong>I</strong> want to is to build my own
          solution.
        </p>
        <p>
          Enter this project, which I’ve dubbed “nefelion” after the Ancient
          Greek{' '}
          <a
            href="http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.04.0057:entry=nefe/lion"
            title="Perseus Digital Library: LSJ dictionary entry for νεφέλιον"
          >
            νεφέλιον
          </a>, the diminutive of{' '}
          <a
            href="http://www.perseus.tufts.edu/hopper/morph?l=nefe%2Flh&amp;la=greek&amp;can=nefe%2Flh0&amp;prior=to/"
            title="Perseus Digital Library: LSJ dictionary entry for νεφέλη"
          >
            νεφέλη
          </a>, &quot;cloud.&quot; <code>nefelion.me</code> is my little cloud;
          it’s my bespoke access-from-any-web-connection application like so
          many of the other (big) cloud applications in wide use today (e.g.,
          Google, Facebook, Dropbox, &amp;c), but tailored exactly to my needs
          and preferences.
        </p>
        <p>
          Finally, before I leave my reader (whoever you are{' '}
          <span role="img" aria-label="wink emoji">
            😉
          </span>) with too much of an impression that the driving force behind
          this project is the <em>failure</em> of other projects to meet my
          needs and desires, let me explain further.
        </p>
        <p>
          I am an engineer, both as my day job and at{' '}
          <span role="img" aria-label="red heart emoji">
            ❤️
          </span>. I <strong>like</strong> to build things; in fact, I{' '}
          <em>thrive</em> on it. So a great deal of the motivation here is the
          pleasure of the building itself.
        </p>
        <p>
          It&#39;s also the freedom to experiment and change things as
          frequently as I desire. Anyone who has been an early adopter of a
          Minimum Viable Product piece of software (or hardware) knows the pain
          of waiting...
        </p>
        <p>...waiting</p>
        <p>...and (moar) waiting...</p>
        <p>
          ...for the single killer feature that’s going to make the product fit
          into your life in exactly the way you want it to. With nefelion I
          still have to wait for features, but I’m in control of the waiting
          because I’m in control of the building!
        </p>
        <Divider />
        <ol id="footnotes">
          <li id="fn1">
            For as long as the Pebble ecosystem survives now that the company
            has been sold to Fitbit... <a href="#ffn1">&#x21A9;&#xFE0E;</a>
          </li>
          <li id="fn2">
            <a href="http://quantifiedself.com/" title="Quantified Self">
              Quantified Self
            </a>{' '}
            has released an iOS app{' '}
            <a
              href="http://quantifiedself.com/qs-access-app/"
              title="Quantified Self: QS Access App"
            >
              QS Access
            </a>{' '}
            that allows for the export of HealthKit data into a table format for
            use in any CSV compatible tool. This a great boon to many
            self-trackers but still does not solve the issue of the utter lack
            of open <em>machine</em>-accessibility of HealthKit data outside of
            the iOS sandbox. <a href="#ffn2">&#x21A9;&#xFE0E;</a>
          </li>
        </ol>
      </TextPage>
    </FadeInOut>
  );
};

About.propTypes = {
  pathname: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['entering', 'entered', 'exiting', 'exited'])
    .isRequired,
};

export default wrapPage(About);
