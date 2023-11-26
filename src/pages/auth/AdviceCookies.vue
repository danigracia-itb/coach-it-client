<template>
    <div :class="{ 'aviso-cookies': showCookieNotice }" id="aviso-cookies">

        <RouterLink to="/"><a>Go Back</a></RouterLink>
        <h1>Cookie Notice</h1>
        <h3>What are cookies?</h3>
        <p>A cookie is a file that is downloaded to your computer when you access certain websites. Cookies allow a website,
            among other things, to store and retrieve information about the browsing habits of a user or their computer, and
            depending on the information they contain and how you use your computer, they can be used to recognize the user.
        </p>

        <h3>What types of cookies does this website use?</h3>
        <p>This website uses the following types of cookies:</p>

        <p><b>Analysis Cookies:</b> These are cookies that, when processed by us or third parties, allow us to quantify the
            number of users and perform the measurement and statistical analysis of the use made by users of the offered
            service. For this, their navigation on our website is analyzed in order to improve the offer of products or
            services
            that we provide.</p>

        <p><b>Technical Cookies:</b> These are cookies that allow the user to navigate through the restricted area and use
            its
            different functions, such as, for example, carrying out the process of purchasing an item.</p>

        <p><b>Customization Cookies:</b> These are cookies that allow the user to access the service with some general
            predefined characteristics based on a series of criteria on the user's terminal, such as language or the type of
            browser through which they connect to the service.</p>

        <p><b>Advertising Cookies:</b> These are cookies that, either processed by this website or third parties, allow the
            most
            effective management of the advertising spaces on the website, adapting the content of the ad to the content of
            the
            requested service or the user's use of our website. For this, we can analyze your Internet browsing habits and
            show
            you advertising related to your browsing profile.</p>

        <p><b>Behavioral Advertising Cookies:</b> These are cookies that allow the most effective management of the
            advertising
            spaces that, if applicable, the editor has included in a website, application, or platform from which it
            provides
            the requested service. This type of cookies stores information about the behavior of visitors obtained through
            the
            continuous observation of their browsing habits, allowing the development of a specific profile to display
            advertising notices based on it.</p>

        <h3>Disable cookies.</h3>
        <p>You can allow, block, or delete the cookies installed on your computer by configuring the options of the browser
            installed on your computer.</p>

        <p>In most web browsers, it is possible to allow, block, or delete cookies installed on your computer.</p>

        <p>You can access the settings of the most common web browsers below to accept, install, or disable cookies:</p>

        <p><a href=" https://support.google.com/chrome/answer/95647?hl=en" target="_blank" rel="noopener">Configure cookies
                in
                Google Chrome</a></p>

        <p><a href="http://windows.microsoft.com/en-us/windows7/how-to-manage-cookies-in-internet-explorer-9"
                target="_blank" rel="noopener">Configure cookies in Microsoft Internet Explorer</a></p>

        <p><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences?redirectlocale=en&redirectslug=enable-and-disable-cookies-website-preferences"
                target="_blank" rel="noopener">Configure cookies in Mozilla Firefox</a></p>

        <p><a href="https://support.apple.com/en-us/HT201265" target="_blank" rel="noopener">Configure cookies in Safari
                (Apple)</a></p>

        <h3>Third-party cookies.</h3>

        <p>This website uses third-party services to collect information for statistical and website usage purposes.
            DoubleClick
            cookies are used to improve the advertising included on the website. They are used to target advertising based
            on
            content that is relevant to a user, thus improving the quality of the user experience.</p>

        <p>Specifically, we use the services of Google Adsense and Google Analytics for our statistics and advertising. Some
            cookies are essential for the operation of the site, such as the integrated search.</p>

        <p>Our site includes other functionalities provided by third parties. You can easily share content on social
            networks
            such as Facebook, Twitter, or Google +, with the buttons that we have included for this purpose.</p>

        <h3>Warning about deleting cookies.</h3>

        <p>You can delete and block all cookies from this site, but some parts of the site may not work, or the quality of
            the
            website may be affected.</p>

    <p>If you have any doubts about our cookie policy, you can contact this website through our Contact channels.</p>
</div></template>

<script>
import { RouterLink } from 'vue-router';
</script>
