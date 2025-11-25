const App = {

    init: function () {
        App.generalInit();
        App.headerSearchToggle();
        App.headerAgentNav();
        App.headerAgentCTA();
        App.headerLogin();
        App.sidenavToggle();
        App.sidenavSubmenu();
        App.tabs();
        App.popups();
        App.copyable();
        App.selectCustom();
        App.filterKeywords();
        App.footerCategoryTab();
        App.agentReport();
        App.agentAwardSlider();
        App.agentVideoSingle(); // single video
        App.agentTeamSlider();
        App.agentTestimonialSlider();
        App.containerCrop();
        App.agentResultsSlots();
        App.selectMultiple();
        App.agentStickyNav();
        App.agentListingsMobile();
        App.agentCaseStudiesMobile();
        App.footerMobileAccordion();
        App.agentBookAppraisal();
        App.customScrollbar();
        App.floatingBarView();
    },

    // general script to add once loaded
    generalInit: function () {
        history.scrollRestoration = "manual";

        if (window.location.hash) {
            setTimeout(() => {
                let hashT = '#' + window.location.hash.substring(1).toString()
                window.scrollTo({
                    'behavior': 'smooth',
                    'left': 0
                });
            }, 2000)
        }

        if (document.querySelectorAll('.prevent-default').length) {
            document.querySelectorAll('.prevent-default').forEach((prevBtn) => {
                prevBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                })
            })
        }

        if (document.querySelectorAll('.scroll-to').length) {
            document.querySelectorAll('.scroll-to').forEach((scrollBtn) => {
                scrollBtn.addEventListener('click', function (e) {
                    scrollTo(document.getElementById(scrollBtn.getAttribute('href').substring(1)))
                })
            })
        }

        // lazyload
        const lazyLoadInstance = new LazyLoad({})
    },

    // toggling header search panel
    headerSearchToggle: function () {
        if (document.querySelector('.header-search') != null) {
            const btnSearch = document.querySelector('.header-search__icon');
            const headerSearchContainer = document.querySelector('.quicksearch__filter__container');
            btnSearch.addEventListener('click', () => {
                btnSearch.parentElement.classList.toggle('header-search--active');
            })
        }
    },

    // toggling header search filter + advance filter popup
    headerFilter: function () {
        if (document.querySelector('.filter-results') !== null) {
            const btnFilter = document.querySelector('.quicksearch__filter > button');
            const btnFilterAdvance = document.querySelector('.quicksearch__filter-advanced');
            const containerFilterAdvance = document.querySelector('.filter-results');
            const btnFilterAdvanceClose = document.querySelector('.filter-results__close');

            btnFilter.addEventListener('click', () => {
                btnFilterAdvance.parentElement.classList.remove('hidden');
                btnFilter.parentElement.parentElement.classList.toggle('quicksearch__filter--expand');
            })
            btnFilterAdvance.addEventListener('click', () => {
                btnFilter.parentElement.parentElement.classList.remove('quicksearch__filter--expand');
                containerFilterAdvance.classList.add('filter-results--active');
                document.querySelector('body').classList.add('body--full');
            })
            btnFilterAdvanceClose.addEventListener('click', () => {
                containerFilterAdvance.classList.remove('filter-results--active');
                document.querySelector('body').classList.remove('body--full');
            })
        }
    },

    // scroll to element by ID for agent nav
    headerAgentNav: function () {
        if (document.querySelector('.agent-header__navigation') != null) {
            const agentNav = document.querySelectorAll('.agent-header__navigation .agent-header__navigation__item');

            agentNav.forEach((item) => {
                item.addEventListener('click', () => {
                    document.querySelector('.agent-header__navigation__item--active').classList.remove('agent-header__navigation__item--active');
                    item.classList.add('agent-header__navigation__item--active');
                })
            })
        }
    },

    headerAgentCTA: function () {
        if (document.querySelector('.agent-header__cta') != null) {
            const agentHeaderCTA = document.querySelector('.agent-header__cta');
            agentHeaderCTA.querySelector('.img-icon--header-more').addEventListener('click', () => {
                agentHeaderCTA.querySelector('.agent-header__buttons').classList.toggle('agent-header__buttons--expand');
            })
        }
    },

    // toggle agent login on header
    headerLogin: function () {
        if (document.querySelectorAll('.menu__item--login').length) {
            const agentLoginButton = document.querySelector('.menu__item--login');
            const popupAgentLogin = document.querySelector('.popup__login');
            const popupClose = document.querySelector('.popup__login .popup__close');

            agentLoginButton.addEventListener('click', () => {
                popupAgentLogin.classList.toggle('popup--open');
            })

            popupClose.addEventListener('click', () => {
                popupAgentLogin.classList.remove('popup--open')
            })
        }
    },

    // toggle side navigation panel
    sidenavToggle: function () {
        if (document.querySelector('.site-header__sidenav') != null) {
            const sidenavToggle = document.querySelector('.sidenav__icon');
            sidenavToggle.addEventListener('click', () => {
                sidenavToggle.parentElement.classList.toggle('site-header__sidenav--expand');
                document.querySelector('body').classList.toggle('body--full')
            })
        }
    },

    // toggle side nav submenu
    sidenavSubmenu: function () {
        if (document.querySelector('.sidenav__menu') !== null) {
            const sidenavItems = document.querySelectorAll('.sidenav__menu__item > a');
            const sidenavOverviewLinks = document.querySelectorAll('.sidenav__overview-links');

            sidenavOverviewLinks[0].classList.add('active');
            sidenavItems[0].parentElement.classList.add('sidenav__menu__item--active');

            sidenavItems.forEach((item) => {
                if (item.parentElement.querySelectorAll('.menu__subx').length > 0) {
                    item.addEventListener('click', (ev) => {
                        ev.preventDefault();
                        item.parentElement.classList.toggle('sidenav__menu__item--expand')
                    })
                } else {
                    item.addEventListener('click', (ev) => {
                        ev.preventDefault();
                        sidenavItems.forEach((_) => _.parentElement.classList.remove('sidenav__menu__item--active'));
                        item.parentElement.classList.add('sidenav__menu__item--active');
                        // change the overview link panel
                        sidenavOverviewLinks.forEach((panel) => {
                            if (panel.getAttribute('data-panel') == item.getAttribute('data-panel')) {
                                panel.classList.add('active');
                            } else {
                                panel.classList.remove('active');
                            }
                        })
                    })
                }
            })

        }
    },

    // base tabs functionality that can be used as single component / mixed
    tabs: function () {
        if (document.querySelectorAll('.tabs').length && document.querySelectorAll('.tabs__panel').length) {
            const tabs = document.querySelectorAll('.tabs');

            tabs.forEach((tab) => {
                const tabNavs = tab.querySelectorAll('.tabs__item');
                const tabPanels = tab.querySelectorAll('.tabs__panel');
                let tabsBorder = document.createElement('span');
                tabsBorder.classList.add('tabs__border');

                // set first tab nav and tab panel as active
                tabNavs[0].classList.add('tabs__item--active');
                tabPanels[0].classList.add('tabs__panel--active');

                // add border indicator
                tab.querySelector('.tabs__nav').appendChild(tabsBorder);

                // trigger tabs on click
                tabNavs.forEach((nav) => {
                    nav.setAttribute('data-pos-left', nav.offsetLeft);
                    nav.setAttribute('data-pos-top', nav.offsetTop);
                    tabsBorder.setAttribute('style', `width:${parseInt(tabNavs[0].getBoundingClientRect().width)}px; left:${tabNavs[0].offsetLeft}px;`);

                    nav.addEventListener('click', (ev) => {
                        ev.preventDefault();
                        // remove sibling's navs active state and set clicked nav as active
                        [].forEach.call(tabNavs, (el) => {
                            el.classList.remove('tabs__item--active')
                        })
                        nav.classList.add('tabs__item--active');
                        tabsBorder.setAttribute('style', `width:${parseInt(nav.getBoundingClientRect().width)}px; left: ${nav.offsetLeft}px;`);

                        // remove sibling's panels active state and set targeted panel as active
                        tabPanels.forEach((panel) => {
                            // only set active if [data-panel] is matched
                            if (panel.getAttribute('data-panel') == nav.getAttribute('data-panel')) {
                                panel.classList.add('tabs__panel--active');
                            } else {
                                panel.classList.remove('tabs__panel--active');
                            }
                        })
                    })
                })
            })
        }
    },

    // handle all popups
    popups: function () {
        if (document.querySelectorAll('.popup').length && document.querySelectorAll('.popup__close').length) {
            const popupClose = document.querySelectorAll('.popup__close');

            popupClose.forEach((_) => {
                _.addEventListener('click', () => {
                    _.closest('.popup').classList.remove('popup--open');
                })
            })
        }
    },

    // all copy to clipboard trigger
    copyable: function () {
        if (document.querySelectorAll('.copy-clipboard').length) {
            const copyTriggers = document.querySelectorAll('.copy-clipboard');

            copyTriggers.forEach((_) => {
                /* Select the text field */
                _.addEventListener('click', () => {
                    // copy from attribute data-copy or the text if not having one
                    if (_.getAttribute('data-copy') != null) {
                        navigator.clipboard.writeText(_.getAttribute('data-copy'));
                    } else {
                        navigator.clipboard.writeText(_.value);
                    }
                    _.classList.add('copy-clipboard--copied');
                    setTimeout(() => {
                        _.classList.remove('copy-clipboard--copied');
                    }, 2000);
                })
            })
        }
    },

    // custom selectmenu dropdown
    selectCustom: function () {
        // filter results
        if (document.querySelectorAll('select').length) {

            const agentQuestionsSelects = document.querySelectorAll('.agent-question select');

            if (agentQuestionsSelects.length) {
                agentQuestionsSelects.forEach((selectEl) => {
                    NiceSelect.bind(document.getElementById(selectEl.getAttribute('id')));
                    if (selectEl.querySelector('option[data-display]') !== null) {
                        selectEl.closest('.agent-question__field').setAttribute('data-placeholder', selectEl.querySelector('option[data-display]').getAttribute('data-display'))
                        if (document.querySelectorAll('.nice-select.select-custom').length) {
                            const nsc = document.querySelectorAll('.nice-select.select-custom')
                            nsc.forEach(_ => {
                                _.querySelector('.current').classList.add('font--grey')
                                _.addEventListener('click', () => {
                                    if (_.querySelector('.current').textContent.includes(_.closest('.agent-question__field').getAttribute('data-placeholder'))) {
                                        _.querySelector('.current').classList.add('font--grey')
                                    } else {
                                        _.querySelector('.current').classList.remove('font--grey')
                                    }
                                })
                            })
                        }
                    }
                })
            }
            // sort z-index
            const agentQFields = document.querySelectorAll('.agent-question__field')
            if (agentQFields.length) {
                agentQFields.forEach((el, idx) => {
                    el.style.zIndex = agentQFields.length - idx
                })
            }
        }
    },

    // custom range slider for filter search
    rangeSlider: function () {
        if (document.querySelectorAll('.range-slider').length) {
            const rangeSliders = document.querySelectorAll('.range-slider');

            rangeSliders.forEach((slider) => {
                const labelMax = slider.parentElement.parentElement.querySelector('.filter__rvalue__max');
                const labelMin = slider.parentElement.parentElement.querySelector('.filter__rvalue__min');

                // create range slider for each slider
                noUiSlider.create(slider, {
                    start: [12300, 800000],
                    connect: true,
                    range: {
                        'min': 0,
                        'max': 1000000
                    }
                });
                // update the value to range min max label
                slider.noUiSlider.on('update', function (values, handle) {
                    labelMin.innerText = `$${Math.round(values[0] * 1).toLocaleString('en')}`;
                    labelMax.innerText = `$${Math.round(values[1] * 1).toLocaleString('en')}`;
                })
            })
        }
    },

    // custom keywords filter
    // add new keyword selection item on "ENTER" key
    // remove keyword selection item on "x" click
    filterKeywords: function () {
        if (document.querySelectorAll('.quicksearch__keywords').length) {
            const filterKeywordSelections = document.querySelectorAll('.quicksearch__keywords');
            filterKeywordSelections.forEach((keyword) => {
                keyword.querySelector('input[type="text"]').addEventListener('keydown', function (ev) {

                    // add selection item on ENTER
                    if (ev.keyCode === 13) {
                        ev.preventDefault();
                        if (this.value != '' && this.value != null) {
                            let tag = document.createElement('div');
                            let tagIcon = document.createElement('span');
                            let text = document.createTextNode(this.value);
                            tagIcon.classList.add('img-icon--close-bold');
                            tag.appendChild(text);
                            tag.appendChild(tagIcon);
                            tag.classList.add('selection__item');
                            keyword.querySelector('.quicksearch__keywords__selection').appendChild(tag);
                            this.value = '';
                        }
                    }
                })

                // remove selected keyword selection item
                keyword.addEventListener('click', function (ev) {
                    if (ev.target.getAttribute('class') == 'img-icon--close-bold') {
                        ev.target.parentElement.remove();
                    }
                })
            })
        }

        // filter results
        if (document.querySelectorAll('.filter-results__keywords').length) {
            const filterKeywordSelections = document.querySelectorAll('.filter-results__keywords');
            filterKeywordSelections.forEach((keyword) => {
                keyword.querySelector('input[type="text"]').addEventListener('keydown', function (ev) {

                    if (ev.keyCode === 13) {
                        ev.preventDefault();
                        if (this.value != '' && this.value != null) {
                            let tag = document.createElement('div');
                            let tagIcon = document.createElement('span');
                            let text = document.createTextNode(this.value);
                            tagIcon.classList.add('img-icon--close-bold');
                            tag.appendChild(text);
                            tag.appendChild(tagIcon);
                            tag.classList.add('selection__item');
                            keyword.querySelector('.filter-results__keywords__selection').appendChild(tag);
                            this.value = '';
                        }
                    }
                })

                keyword.addEventListener('click', function (ev) {
                    if (ev.target.getAttribute('class') == 'img-icon--close-bold') {
                        ev.target.parentElement.remove();
                    }
                })
            })
        }

        // filter status
        if (document.querySelectorAll('.filter-results__status').length) {
            const filterStatusSelections = document.querySelectorAll('.filter-results__status');
            filterStatusSelections.forEach((status) => {
                status.querySelector('input[type="text"]').addEventListener('keydown', function (ev) {

                    if (ev.keyCode === 13) {
                        ev.preventDefault();
                        if (this.value != '' && this.value != null) {
                            let tag = document.createElement('div');
                            let tagIcon = document.createElement('span');
                            let text = document.createTextNode(this.value);
                            tagIcon.classList.add('img-icon--close-bold');
                            tag.appendChild(text);
                            tag.appendChild(tagIcon);
                            tag.classList.add('selection__item');
                            status.querySelector('.filter-results__status__selection').appendChild(tag);
                            this.value = '';
                        }
                    }
                })

                status.addEventListener('click', function (ev) {
                    if (ev.target.getAttribute('class') == 'img-icon--close-bold') {
                        ev.target.parentElement.remove();
                    }
                })
            })
        }
    },

    // tab for Footer categories
    footerCategoryTab: function () {
        if (document.querySelectorAll('.footer__category__item[data-panel]').length) {
            const categories = document.querySelectorAll('.footer__category__item[data-panel]');
            const categoriesPanel = document.querySelectorAll('.footer__panel[data-panel]');

            // toggling footer panel based on nav
            categories.forEach((category, index) => {
                category.addEventListener('click', (ev) => {
                    if (category.getAttribute('data-redirect') == true) {

                    } else {
                        ev.preventDefault();
                    }

                    categories.forEach((_) => {
                        _.classList.remove('footer__category__item--active');
                    })
                    categoriesPanel.forEach((_) => {
                        _.classList.remove('footer__panel--active');
                        if (_.getAttribute('data-panel') === category.getAttribute('data-panel')) {
                            _.classList.add('footer__panel--active');
                        }
                    })
                    category.classList.add('footer__category__item--active');
                })
            })

            const tabNavs = document.querySelectorAll('.footer__category__item');
            let tabsBorder = document.createElement('span');
            tabsBorder.classList.add('tabs__border');

            // set first tab nav and tab panel as active
            tabNavs[0].classList.add('tabs__item--active');

            // add border indicator
            tabNavs[0].closest('.footer__category').appendChild(tabsBorder);

            // trigger tabs on click
            tabNavs.forEach((nav) => {
                nav.setAttribute('data-pos-left', nav.offsetLeft);
                nav.setAttribute('data-pos-top', nav.offsetTop);
                tabsBorder.setAttribute('style', `width:${parseInt(tabNavs[0].querySelector('a').getBoundingClientRect().width)}px; left:${tabNavs[0].offsetLeft}px;`);

                nav.addEventListener('click', (ev) => {
                    if (nav.getAttribute('data-redirect')) {
                        if (nav.querySelector('a') != null && nav.querySelector('a').getAttribute('href')) {
                            window.location.href = nav.querySelector('a').getAttribute('href')
                        }
                    } else {
                        ev.preventDefault();
                    }
                    // remove sibling's navs active state and set clicked nav as active
                    [].forEach.call(tabNavs, (el) => {
                        el.classList.remove('tabs__item--active')
                    })
                    nav.classList.add('tabs__item--active');
                    tabsBorder.setAttribute('style', `width:${parseInt(nav.querySelector('a').getBoundingClientRect().width)}px; left: ${nav.offsetLeft}px;`);

                })
            })
        }
    },

    // equalheights
    agentReport: function () {
        App.equalHeight('.agent-report__content', '.agent-report__panel');
    },

    // build slider for awards
    agentAwardSlider: function () {
        App.makeSlider('.agent-awards__slider', 5, false, "carousel", 1, [1, 2, 5], 30);
    },

    // agent video single with Plyr
    agentVideoSingle: function () {
        if (document.querySelector('#video-player') != null && document.querySelectorAll('.agent-video--single').length) {
            // handle video item on click to shown on popup
            const vidPlayerS = new Plyr('#video-player'); // agent video single
            const popupAgentVideoS = document.querySelector('#popup-agent-video');
            const popupAgentVideoSClose = document.querySelector("#popup-agent-video .popup__close");
            const agentVideoItems = document.querySelectorAll('.agent-video--single .agent-video__video > img');

            // change video source dinamically on click
            agentVideoItems.forEach((item) => {
                // create preview based on video youtube

                item.addEventListener('click', () => {
                    if (item.parentElement.getAttribute('data-video') != null) {
                        vidPlayerS.source = {
                            type: 'video',
                            sources: [{
                                src: item.parentElement.getAttribute('data-video'),
                                provider: item.parentElement.getAttribute('data-provider') != null ? item.parentElement.getAttribute('data-provider') : 'youtube',
                            },],
                        };
                    }
                    popupAgentVideoS.classList.toggle('popup--open');
                })
            })

            // close popup
            popupAgentVideoSClose.addEventListener('click', () => {
                popupAgentVideoS.classList.remove('popup--open')
                vidPlayerS.stop()
            })
        }
    },

    // build slider for video
    // init Plyr to play video on popup
    agentVideoSlider: function () {
        App.makeSliderCenter('.agent-video__slider', 1, false, "carousel", "page", [3, 3, 3], 0, false, 978);

        // handle video item on click to shown on popup
        if (document.querySelector('#video-player') != null && document.querySelectorAll('.agent-video--slider').length) {
            const vidPlayer = new Plyr('#video-player'); // player default from sliders
            const popupAgentVideo = document.querySelector('#popup-agent-video');
            const popupAgentVideoClose = document.querySelector("#popup-agent-video .popup__close");
            const agentVideoSliderItem = document.querySelectorAll('.agent-video__slider .agent-video__item > img');

            // change video source dinamically on click
            agentVideoSliderItem.forEach((item) => {
                item.addEventListener('click', () => {
                    if (item.parentElement.getAttribute('data-video') != null) {
                        vidPlayer.source = {
                            type: 'video',
                            sources: [{
                                src: item.parentElement.getAttribute('data-video'),
                                provider: 'youtube',
                            },],
                        };
                    }
                    vidPlayer.play()
                    popupAgentVideo.classList.toggle('popup--open');
                })
            })

            // close popup
            popupAgentVideoClose.addEventListener('click', () => {
                vidPlayer.stop()
                popupAgentVideo.classList.remove('popup--open')
            })
        }
    },

    // slider
    agentTeamSlider: function () {
        if (document.querySelectorAll('.agent-team__slider').length) {
            App.makeSlider('.agent-team__slider', 5, true, 'carousel', 'page', [1, 2, 5], 0, true, false, false, false);
            setTimeout(() => {
                if (document.querySelector('.agent-team__slider').querySelectorAll('.tns-item:not(.tns-slide-cloned)').length < 5) {
                    if (window.outerWidth > 1200) {
                        document.querySelector('.agent-team__slider').classList.add('tns-notfull')
                    }
                }
            }, 1500)
        }
    },

    // slider
    agentTestimonialSlider: function () {
        if (document.querySelectorAll('.agent-testimonial__slider').length) {
            let agentTestiSlider = App.makeSlider('.agent-testimonial__slider', 1, true);
            let agentTesti = document.querySelector('.agent-testimonial.slider')

            let btn = document.createElement('button')
            btn.setAttribute('type', 'button')
            btn.setAttribute('data-controls', 'next')
            btn.setAttribute('aria-controls', agentTesti.querySelector('.tns-nav button').getAttribute('aria-controls'))
            btn.innerHTML = `<div class="control-next"><i class="slider__next img-icon--arrow-right"></i></div>`;
            btn.addEventListener('click', () => {
                agentTestiSlider.goTo('next')
            })
            if (!agentTesti.querySelectorAll('.tns-nav button[data-controls]').length) {
                agentTesti.querySelector('.tns-nav').appendChild(btn)
            }
        }
    },

    // Container with truncated copy / text with toggling
    containerCrop: function () {
        if (document.querySelectorAll('.container-crop__toggle').length) {
            const containerCropToggles = document.querySelectorAll('.container-crop__toggle');

            containerCropToggles.forEach((toggle, index) => {
                // set the default height to be the first 2 element
                if (toggle.previousElementSibling.classList.contains('container-crop')) {
                    let children = toggle.parentElement.querySelector('.container-crop').querySelectorAll('*')
                    // only if the first child element is less than 7 lines, crop is active
                    if (children[0] !== null) {
                        if (children[0].offsetHeight <= 135 && !toggle.parentElement.querySelector('.container-crop').classList.contains('container-crop--disabled')) {
                            children.forEach((child) => {
                                if (index >= 2) return;
                                let styles = window.getComputedStyle(child);
                                let margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);

                                toggle.parentElement.querySelector('.container-crop').setAttribute('style', `max-height: ${Math.ceil(child.offsetHeight + margin + 50)}px`)
                                // toggle.parentElement.querySelector('.container-crop').style.maxHeight .setAttribute('style', '')  = Math.ceil(child.offsetHeight + margin);
                            })
                        } else { // if it's 7 lines or more, disable crop
                            toggle.parentElement.querySelector('.container-crop').removeAttribute('style');
                            toggle.parentElement.querySelector('.container-crop').classList.add('container-crop--disabled')
                        }
                    }

                }

                // action
                if (!toggle.getAttribute('data-label-more')) toggle.setAttribute('data-label-more', 'Read more');
                if (!toggle.getAttribute('data-label-less')) toggle.setAttribute('data-label-less', 'Read less');
                toggle.addEventListener('click', (ev) => {
                    ev.preventDefault();
                    if (toggle.previousElementSibling.classList.contains('container-crop')) {
                        toggle.previousElementSibling.classList.toggle('container-crop--expand');
                    }
                })
            })
        }
    },

    // Slot animation effect sliding up to stat's value
    agentResultsSlots: function () {
        if (document.querySelectorAll('.agent-results__valuez').length) {
            const statsValues = document.querySelectorAll('.agent-results__value');

            statsValues.forEach((value) => {
                const valueNumbers = value.querySelectorAll('span');

                valueNumbers.forEach((_) => {
                    let val = _.innerText

                    // target numbers only
                    if (!isNaN(parseInt(val))) {
                        // built custom slot__item with slot__panel dynamically
                        _.classList.add('slot__item');
                        let slotPanel = document.createElement('div');
                        slotPanel.classList.add('slot__panel')
                        // add slot__panel items from 0 to N number based on val's HTML content
                        for (let i = 0; i <= parseInt(val); i++) {
                            let slotNumber = document.createElement('span');
                            let slotVal;
                            if (val.includes('.')) {
                                slotVal = document.createTextNode(i + '.');
                            } else {
                                slotVal = document.createTextNode(i);
                            }

                            slotNumber.appendChild(slotVal);
                            slotPanel.appendChild(slotNumber);
                        }
                        _.appendChild(slotPanel);
                    }

                    // only active the animation when visible
                    document.addEventListener('scroll', () => {
                        if (this.isInViewport(_)) _.parentElement.classList.add('slot--play');
                    })
                })
            })
        }
        if (document.querySelectorAll('.agent-results__value.slot').length) {
            const slots = document.querySelectorAll('.agent-results__value.slot');
            slots.forEach((slot) => {
                let content = []
                const inText = slot.innerText.split('')
                slot.innerText = ''
                inText.forEach((chr) => {
                    content.push(chr)
                })

                if (content.length > 0) {
                    content.forEach((con) => {
                        let el = document.createElement('span')
                        el.classList.add('slot__char')
                        el.innerText = con
                        slot.appendChild(el)
                    })
                }
            })

            // animate the slot
            const statsValues = document.querySelectorAll('.agent-results__value');

            statsValues.forEach((value) => {
                const valueNumbers = value.querySelectorAll('span');

                valueNumbers.forEach((_) => {
                    let val = _.innerText

                    // target numbers only
                    if (!isNaN(parseInt(val))) {
                        // built custom slot__item with slot__panel dynamically
                        _.classList.add('slot__item');
                        let slotPanel = document.createElement('div');
                        slotPanel.classList.add('slot__panel')
                        // add slot__panel items from 0 to N number based on val's HTML content
                        if (parseInt(val) == 0) {
                            for (let i = 0; i <= 9; i++) {
                                let slotNumber = document.createElement('span');
                                let slotVal;
                                if (val.includes('.')) {
                                    slotVal = i < 9 ? document.createTextNode(i + '.') : document.createTextNode(0 + '.');
                                } else {
                                    slotVal = i < 9 ? document.createTextNode(i) : document.createTextNode(0);
                                }
                                slotNumber.appendChild(slotVal);
                                slotPanel.appendChild(slotNumber);
                            }
                        } else {
                            for (let i = 0; i <= parseInt(val); i++) {
                                let slotNumber = document.createElement('span');
                                let slotVal;
                                if (val.includes('.')) {
                                    slotVal = document.createTextNode(i + '.');
                                } else {
                                    slotVal = document.createTextNode(i);
                                }

                                slotNumber.appendChild(slotVal);
                                slotPanel.appendChild(slotNumber);
                            }
                        }
                        _.appendChild(slotPanel);
                    }

                    // only active the animation when visible
                    document.addEventListener('scroll', () => {
                        if (this.isInViewport(_)) _.parentElement.classList.add('slot--play');
                    })
                })
            })
        }
    },

    // Multiple select with radio based on the theme
    selectMultiple: function () {
        if (document.querySelectorAll('.select-multiple').length) {
            const selectMultiples = document.querySelectorAll('.select-multiple .select-multiple__button');
            selectMultiples.forEach((el) => {
                el.addEventListener('click', () => {
                    el.parentElement.classList.toggle('select-multiple--active');
                })
            });
        }
    },

    // sticky nav for agent profile
    // displayed by default, hidden on scrolling, displayed again on stop scrolling
    agentStickyNav: function () {
        if (document.querySelectorAll('.agent-header').length) {
            const agentHeader = document.querySelector('.agent-header');
            let lastScrollTop = 0;
            let isScrolling;

            window.addEventListener('scroll', (event) => {
                let st = window.pageYOffset || document.documentElement.scrollTop;

                // do something
                if (st > lastScrollTop) {
                    // downscroll
                    agentHeader.classList.add('agent-header--triggered')
                    agentHeader.classList.add('agent-header--hide')
                } else {
                    // upscroll
                    agentHeader.classList.remove('agent-header--hide')
                    if (window.pageYOffset < 90) {
                        agentHeader.classList.remove('agent-header--triggered')
                    }
                }

                // Clear our timeout throughout the scroll
                window.clearTimeout(isScrolling);

                // Set a timeout to run after scrolling ends
                isScrolling = setTimeout(function () {
                    agentHeader.classList.remove('agent-header--hide')
                }, 200);

                // for mobile compatibility
                lastScrollTop = st <= 0 ? 0 : st;
            }, false);
        }
    },



    // agent's mobile tabs nav
    agentTabsMobile: function () {
        if (document.querySelectorAll('.agent-listings__tab-nav')) {
            const agentPropertyNavs = document.querySelectorAll('.agent-listings__tab-nav');
            App.makeSliderTab('.agent-listings__tab-nav', 1, false);
        }
    },

    // agent's listings mobile slider
    agentListingsMobile: function () {
        if (document.querySelectorAll('.agent-listings .listings').length) {
            const agentListings = document.querySelectorAll('.agent-listings .listings');
            if (window.innerWidth <= 767) {
                App.makeSlider('.agent-listings [data-panel="listing-sale"] .listings', 1, false);
                App.makeSlider('.agent-listings [data-panel="listing-sold"] .listings', 1, false);
                App.makeSlider('.agent-listings [data-panel="listing-inspection"] .listings', 1, false);
                App.makeSlider('.agent-listings [data-panel="listing-auction"] .listings', 1, false);
            }
        }
    },

    agentCaseStudiesMobile: function () {
        if (document.querySelectorAll('.agent-case__grid').length) {
            let agentListingSlider;
            if (window.innerWidth <= 767) {
                agentListingSlider = App.makeSlider('.agent-case__grid', 1, false, "carousel", 1, [1, 1], 30, false);
            }
            window.addEventListener('resize', () => {
                if (window.innerWidth <= 767) {
                    if (!agentListingSlider == null) App.makeSlider('.agent-case__grid', 1, false);
                } else {
                    // destroy
                    if (!agentListingSlider == null) agentListingSlider.destroy();
                }
            })
        }
    },

    // footer category slider
    footerMobileCatSlider: function () {
        if (document.querySelectorAll('.footer__category').length) {
            if (window.innerWidth < 768) {
                App.makeSlider('.footer__category', 1, false, 'carousel', 1, [1, 1], 0, false)
            }
        }
    },

    // footer link accordion
    footerMobileAccordion: function () {
        if (document.querySelectorAll('.footer__menu').length) {
            if (window.innerWidth < 768) {
                const footerMenus = document.querySelectorAll('.footer__menu');
                footerMenus.forEach((menu) => {
                    let labelHeading = menu.querySelector('.footer__menu__heading');
                    if (!labelHeading) return;
                    labelHeading.addEventListener('click', () => {
                        menu.classList.toggle('footer__menu--expand');
                        menu.setAttribute('style', 'min-height:' + labelHeading.offsetHeight + 'px');
                    })
                })
            }
        }
    },

    agentBookAppraisal: function () {
        if (document.querySelectorAll('.popup__book-appraisal').length && document.querySelectorAll('.agent-hero__cta__button').length) {
            const bookButton = document.querySelector('.agent-hero__cta__button');
            const bookSubmitButton = document.querySelector('.popup__book-appraisal .button[type="submit"]')
            const popupAppraisal = document.querySelector('.popup__book-appraisal');
            const popupClose = document.querySelector('.popup__book-appraisal .popup__close');

            bookButton.addEventListener('click', (e) => {
                e.preventDefault()
                popupAppraisal.classList.toggle('popup--open');
            })

            bookSubmitButton.addEventListener('click', (e) => {
                e.preventDefault()
                if (bookSubmitButton.closest('form').querySelectorAll('input:not([type="checkbox"])').length && bookSubmitButton.closest('form').querySelectorAll('textarea').length && bookSubmitButton.closest('form').querySelector('input[name="question-tnc-book"]').checked) {
                    let inputFilled = 0
                    let textFilled = 0

                    bookSubmitButton.closest('form').querySelectorAll('input:not([type="checkbox"])').forEach(_ => {
                        if (_.value !== '') inputFilled += 1
                    })
                    bookSubmitButton.closest('form').querySelectorAll('textarea').forEach(_ => {
                        if (_.value !== '') textFilled += 1
                    })
                    if (inputFilled == bookSubmitButton.closest('form').querySelectorAll('input:not([type="checkbox"])').length && textFilled == bookSubmitButton.closest('form').querySelectorAll('textarea').length) {
                        bookSubmitButton.closest('.popup').querySelector('.heading--section').classList.add('hidden')
                        bookSubmitButton.closest('form').classList.add('hidden')
                        bookSubmitButton.closest('.popup__book-appraisal__wrapper').classList.add('popup__wrapper--full')
                        bookSubmitButton.closest('.popup__book-appraisal__wrapper').classList.add('popup__wrapper--center')
                        bookSubmitButton.closest('.popup').querySelector('.popup__book-appraisal__confirmation').classList.remove('hidden')
                        setTimeout(() => {
                            bookSubmitButton.closest('form').submit()
                        }, 3800)
                    }
                }
            })

            popupClose.addEventListener('click', () => {
                popupAppraisal.classList.remove('popup--open')
                bookSubmitButton.closest('.popup').querySelector('.heading--section').classList.remove('hidden')
                bookSubmitButton.closest('form').classList.remove('hidden')
                bookSubmitButton.closest('.popup__book-appraisal__wrapper').classList.remove('popup--fullscreen')
                bookSubmitButton.closest('.popup__book-appraisal__wrapper').classList.remove('popup__wrapper--center')
                bookSubmitButton.closest('.popup').querySelector('.popup__book-appraisal__confirmation').classList.add('hidden')
            })
        }
    },

    customScrollbar: function () {
        if (document.querySelectorAll('.agent-testimonial__content-wrap').length) {
            OverlayScrollbars(document.querySelectorAll('.agent-testimonial__content-wrap'), {});
        }
    },

    floatingBarView: function () {
        const agentSections = document.querySelectorAll('.site-content > section');
        window.addEventListener('scroll', (event) => {
            agentSections.forEach((section) => {
                if (App.isInViewport(section)) {
                    if (!section.classList.contains('section--viewed')) {
                        section.classList.add('section--viewed');
                    }
                }
            })
        }, false);
    },


    // methods only

    // equal height for section / components with it's siblings
    equalHeight: function (target, elem1, elem2 = null, elem3 = null, elem4 = null) {
        if (document.querySelectorAll(target).length && document.querySelectorAll(elem1).length) {
            let baseHeight = 10;
            let baseHeight2 = 10;
            let baseHeight3 = 10;
            let baseHeight4 = 10;
            const tParent = document.querySelectorAll(target);
            tParent.forEach((el) => {
                el.querySelectorAll(elem1).forEach((elx) => {
                    let h = parseFloat(getComputedStyle(elx, null).height)
                    if (h > baseHeight) baseHeight = h;
                })
            });
            if (elem2 !== null) {
                tParent.forEach((el) => {
                    el.querySelectorAll(elem2).forEach((elx) => {
                        let h = parseFloat(getComputedStyle(elx, null).height)
                        if (h > baseHeight2) baseHeight2 = h;
                    })
                });
            }
            if (elem3 !== null) {
                tParent.forEach((el) => {
                    el.querySelectorAll(elem3).forEach((elx) => {
                        let h = parseFloat(getComputedStyle(elx, null).height)
                        if (h > baseHeight3) baseHeight3 = h;
                    })
                });
            }
            if (elem4 !== null) {
                tParent.forEach((el) => {
                    el.querySelectorAll(elem4).forEach((elx) => {
                        let h = parseFloat(getComputedStyle(elx, null).height)
                        if (h > baseHeight4) baseHeight4 = h;
                    })
                });
            }

            tParent.forEach((el) => {
                el.querySelectorAll(elem1).forEach((elTarget) => {
                    elTarget.setAttribute('style', `min-height: ${baseHeight}px`);
                })
                if (elem2 !== null) {
                    el.querySelectorAll(elem2).forEach((elTarget) => {
                        elTarget.setAttribute('style', `min-height: ${baseHeight2}px`);
                    })
                }
                if (elem3 !== null) {
                    el.querySelectorAll(elem3).forEach((elTarget) => {
                        elTarget.setAttribute('style', `min-height: ${baseHeight3}px`);
                    })
                }
                if (elem4 !== null) {
                    el.querySelectorAll(elem4).forEach((elTarget) => {
                        elTarget.setAttribute('style', `min-height: ${baseHeight4}px`);
                    })
                }
            })
        }
    },

    // make slider
    makeSlider: function (sliderContainer, sliderItems = 3, sliderNav = false, sliderMode = 'carousel', sliderSlide = 1, responsiveItems = null, sliderGap = 0, isAutoplay = true, sliderCenter = false, sliderWidth = false, sliderLoop = true) {
        if (document.querySelectorAll(sliderContainer).length) {

            // make a dummy
            let sliderDump = {
                container: sliderContainer,
                items: sliderItems,
                loop: sliderLoop,
                autoWidth: false,
                mode: sliderMode,
                animateIn: 'animslider-filter-in',
                animateOut: 'animslider-filter-out',
                speed: 800,
                slideBy: sliderSlide,
                mouseDrag: 'false',
                center: sliderCenter,
                gutter: sliderGap,
                fixedWidth: sliderWidth,
                viewportMax: 1112,
                autoplay: isAutoplay,
                autoplayButtonOutput: false, //remove button Stop
                nav: sliderNav,
                controlsText: ['<div class="control-prev"><i class="slider__prev img-icon--arrow-left"></i></div>', '<div class="control-next"><i class="slider__next img-icon--arrow-right"></i></div>'],
            }

            // check if responsive is present
            // build responsive via responsiveItems of array [small, mid] -> breakpoint min-width
            if (responsiveItems != null) {
                let resp = {
                    responsive: {
                        0: {
                            items: responsiveItems[0],
                            autoplay: responsiveItems[2] !== null ? responsiveItems[2] : isAutoplay
                        },
                        768: {
                            items: responsiveItems[1],
                            autoplay: responsiveItems[2] !== null ? responsiveItems[2] : isAutoplay
                        },
                        993: {
                            items: sliderItems,
                            autoplay: responsiveItems[2] !== null ? responsiveItems[2] : isAutoplay
                        }
                    }
                }
                Object.assign(sliderDump, resp);
            }

            var slider = tns(sliderDump);

            return slider;
        }
    },

    // make slider mobile
    makeSliderMobile: function (sliderContainer, sliderItems = 3, sliderNav = false, sliderMode = 'carousel', sliderSlide = 1, responsiveItems = null, sliderGap = 0, isAutoplay = true, sliderCenter = false, sliderWidth = false, edge = 0, autoChangeTabNav = false) {
        if (document.querySelectorAll(sliderContainer).length) {

            // make a dummy
            let sliderDump = {
                container: sliderContainer,
                items: sliderItems,
                loop: false,
                rewind: false,
                autoWidth: false,
                mode: sliderMode,
                speed: 800,
                slideBy: sliderSlide,
                mouseDrag: 'false',
                center: sliderCenter,
                gutter: sliderGap,
                fixedWidth: sliderWidth,
                edgePadding: edge,
                autoplay: false,
                autoplayButtonOutput: false, //remove button Stop
                nav: sliderNav,
                controlsText: ['<div class="control-prev"><i class="slider__prev img-icon--arrow-left"></i></div>', '<div class="control-next"><i class="slider__next img-icon--arrow-right"></i></div>'],
            }

            // check if responsive is present
            // build responsive via responsiveItems of array [small, mid] -> breakpoint min-width
            if (responsiveItems != null) {
                let resp = {
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: 1
                        },
                        993: {
                            items: 1
                        }
                    }
                }
                Object.assign(sliderDump, resp);
            }

            var sliderM = tns(sliderDump);
            return sliderM;
        }
    },

    // Make slider centered
    makeSliderCenter: function (sliderContainer, sliderItems = 3, sliderNav = false, sliderMode = 'carousel', sliderSlide = 1, responsiveItems = null, sliderGap = 0, isAutoplay = true, sliderWidth = false) {
        if (document.querySelectorAll(sliderContainer).length) {

            // make a dummy
            let sliderDump = {
                container: sliderContainer,
                items: sliderItems,
                loop: true,
                mode: sliderMode,
                animateIn: 'animslider-filter-in',
                animateOut: 'animslider-filter-out',
                speed: 800,
                slideBy: sliderSlide,
                mouseDrag: 'false',
                center: true,
                gutter: sliderGap,
                fixedWidth: sliderWidth,
                viewportMax: 1112,
                preventActionWhenRunning: true,
                autoplay: isAutoplay,
                autoplayButtonOutput: false, //remove button Stop
                nav: sliderNav,
                controlsText: ['<div class="control-prev"><i class="slider__prev img-icon--arrow-left"></i></div>', '<div class="control-next"><i class="slider__next img-icon--arrow-right"></i></div>'],
            }

            // check if responsive is present
            // build responsive via responsiveItems of array [small, mid] -> breakpoint min-width
            if (responsiveItems != null) {
                let resp = {
                    responsive: {
                        0: {
                            items: responsiveItems[0],
                            viewportMax: false,
                            fixedWidth: window.innerWidth / 2,
                            gutter: 30
                        },
                        768: {
                            items: responsiveItems[1],
                            viewportMax: false,
                            fixedWidth: sliderWidth,
                            gutter: 30
                        },
                        993: {
                            items: sliderItems,
                            viewportMax: 1112,
                            fixedWidth: sliderWidth,
                            gutter: 0
                        }
                    }
                }
                Object.assign(sliderDump, resp);
            }

            var slider = tns(sliderDump);

        }
    },

    makeSliderTab: function (sliderContainer, sliderItems = 3, sliderNav = false, sliderMode = 'carousel', sliderSlide = 1, responsiveItems = null, sliderGap = 0, isAutoplay = true, sliderCenter = false, sliderWidth = false) {
        if (document.querySelectorAll(sliderContainer).length) {

            // make a dummy
            let sliderDump = {
                container: sliderContainer,
                items: sliderItems,
                loop: false,
                autoWidth: false,
                mode: sliderMode,
                animateIn: 'animslider-filter-in',
                animateOut: 'animslider-filter-out',
                speed: 800,
                slideBy: sliderSlide,
                mouseDrag: 'false',
                center: sliderCenter,
                gutter: sliderGap,
                fixedWidth: sliderWidth,
                viewportMax: 1112,
                autoplay: isAutoplay,
                autoplayButtonOutput: false, //remove button Stop
                nav: sliderNav,
                controlsText: ['<div class="control-prev"><i class="slider__prev img-icon--arrow-left"></i></div>', '<div class="control-next"><i class="slider__next img-icon--arrow-right"></i></div>'],
            }

            // check if responsive is present
            // build responsive via responsiveItems of array [small, mid] -> breakpoint min-width
            if (responsiveItems != null) {
                let resp = {
                    responsive: {
                        0: {
                            items: responsiveItems[0]
                        },
                        768: {
                            items: responsiveItems[1]
                        },
                        993: {
                            items: sliderItems
                        }
                    }
                }
                Object.assign(sliderDump, resp);
            }

            var slider = tns(sliderDump);

        }
    },

    // check if element is inside viewport
    isInViewport: function (element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

}


// js modules for listing only
const Listing = {

    init: function () {
        Listing.headerSticky();
        Listing.galleryPopup();
        Listing.gallery();
        Listing.listingHeaderShare();
        Listing.listingHeaderNavigation();
        Listing.listingHeaderFavourite();
        Listing.listingSidebarPanel();
        Listing.listingQuestionSelect();
        Listing.listingQuestionSubmit();
        Listing.mediaToggle();
        Listing.sidebarMenuToggle();
        Listing.customScrollbar();
        Listing.listingVideo();
        Listing.listingChartRound();
        Listing.chartMarketTrendResponsive();
        Listing.listingMarketTrend();
        Listing.floatingBarView();
        Listing.listingPropertyMobile();
        Listing.listingPropertyFavourite();
    },

    // sticky nav for Listing detail page
    // displayed by default, hidden on scrolling, displayed again on stop scrolling
    headerSticky: function () {
        if (document.querySelectorAll('.property-header').length) {
            const listingHeader = document.querySelector('.property-header');
            let lastScrollTop = 0;
            let isScrolling;

            window.addEventListener('scroll', (event) => {
                let st = window.pageYOffset || document.documentElement.scrollTop;

                // do something
                if (st > lastScrollTop) {
                    // downscroll
                    listingHeader.classList.add('property-header--hide')
                } else {
                    // upscroll
                    listingHeader.classList.remove('property-header--hide')
                }

                // Clear our timeout throughout the scroll
                window.clearTimeout(isScrolling);

                // Set a timeout to run after scrolling ends
                isScrolling = setTimeout(function () {
                    listingHeader.classList.remove('property-header--hide')
                }, 200);

                // for mobile compatibility
                lastScrollTop = st <= 0 ? 0 : st;
            }, false);
        }

        if (document.querySelectorAll('.property-header__mobile-nav__menu').length) {
            let lastScrollTop = 0;
            let isScrolling;
            window.addEventListener('scroll', (event) => {
                let st = window.pageYOffset || document.documentElement.scrollTop;

                // do something
                if (st > lastScrollTop) {
                    // downscroll
                    document.querySelector('.property-header__toggle').classList.remove('property-header__toggle--expand')
                    document.querySelector('.property-header__mobile-nav__menu').classList.remove('property-header__mobile-nav__menu--expand')
                    document.querySelector('.property-header__mobile-nav__menu').classList.remove('property-header__mobile-nav__menu--expand-full')
                }

                // Clear our timeout throughout the scroll
                window.clearTimeout(isScrolling);

                // for mobile compatibility
                lastScrollTop = st <= 0 ? 0 : st;
            }, false);

            // resize padding of site-content--property based on prop header name height on mobile
            const siteCont = document.querySelector('.site-content--property')
            if (siteCont !== null) {
                siteCont.setAttribute('data-padtop', jQuery('.site-content--property').css('padding-top'))
                if (window.innerWidth <= 1023) {
                    jQuery('.site-content--property').css('padding-top', parseInt(siteCont.getAttribute('data-padtop').replace('px', '')) + document.querySelector('.property-header__mobile-nav .property-header__name').clientHeight - 34)
                } else {
                    document.querySelector('.site-content--property').removeAttribute('style')
                }
            }
            window.addEventListener('resize', () => {
                if (siteCont !== null) {
                    if (window.innerWidth <= 1023) {
                        jQuery('.site-content--property').css('padding-top', parseInt(siteCont.getAttribute('data-padtop').replace('px', '')) + document.querySelector('.property-header__mobile-nav .property-header__name').clientHeight - 34)
                    } else {
                        document.querySelector('.site-content--property').removeAttribute('style')
                    }
                }
            })
        }
    },

    gallery: function () {
        if (document.querySelectorAll('.property-gallery').length) {
            // create the gallery
            let propertyGallerySlider = App.makeSlider('.property-gallery .slider', 1, false, 'carousel', 'page', [1, 1, false], 0, true);
            // propertyGallery cloned
            const propGal2 = document.querySelector('.property-gallery2')
            if (propGal2 !== null) {
                // swipe action
                let touchStartX = 0
                let touchEndX = 0
                let touchDir = 'none'
                let drag = false
                let dragStartX = 0
                let dragEndX = 0
                let dragDir = 'none'

                function checkSwipeDir() {
                    if (touchStartX > touchEndX) {
                        touchDir = 'left'
                        propertyGallerySlider.goTo('next')
                        touchStartX = 0
                        touchEndX = 0
                        return
                    } else if (touchStartX < touchEndX) {
                        touchDir = 'right'
                        propertyGallerySlider.goTo('prev')
                        return
                    } else {
                        touchDir = 'right'
                    }
                }

                // mobile touch
                propGal2.addEventListener('touchstart', (e) => {
                    touchStartX = e.changedTouches[0].screenX
                    return
                })
                propGal2.addEventListener('touchend', (e) => {
                    touchEndX = e.changedTouches[0].screenX
                    checkSwipeDir()
                    return
                })
                // desktop drag swipe
                document.querySelector('body').addEventListener('mousedown', (e) => {
                    if (e.target.classList.contains('property-gallery2')) {
                        drag = false
                        dragStartX = e.pageX
                    }
                })
                document.querySelector('body').addEventListener('mousemove', (e) => {
                    if (e.target.classList.contains('property-gallery2')) {
                        drag = true
                    }
                })
                document.querySelector('body').addEventListener('mouseup', (e) => {
                    if (e.target.classList.contains('property-gallery2')) {
                        if (drag) {
                            dragEndX = e.pageX
                            if (dragStartX < dragEndX) {
                                propertyGallerySlider.goTo('prev')
                            } else if (dragStartX > dragEndX) {
                                propertyGallerySlider.goTo('next')
                            }
                            drag = false
                            dragStartX = 0
                            dragEndX = 0
                        }
                    }
                })
                document.querySelector('body').addEventListener('click', e => {
                    if (e.target.classList.contains('property-gallery__image')) {
                        propGal2.click()
                    }
                })
            }

            function slideTo(target = '') {
                if (target !== null || target !== '') {
                    propertyGallerySlider.goTo(target)
                    propertyGallerySlider.pause()
                }
            }

            const toggleFloorplan = document.querySelector('.property-sidebar__panel__item[data-target="slider-floorplan"]')
            toggleFloorplan.addEventListener('click', () => {
                slideTo('last')
                if (document.querySelectorAll('.property-gallery .property-gallery__slider-item--floorplan:not(.tns-slide-cloned)').length > 1) {
                    slideTo('prev')
                }
            })

            const toggleFloorplanMobile = document.querySelector('.property-header__mobile-nav__menu__item[data-target="property-floorplan"]')
            toggleFloorplanMobile.addEventListener('click', () => {
                slideTo('last')
                if (document.querySelectorAll('.property-gallery .property-gallery__slider-item--floorplan:not(.tns-slide-cloned)').length > 1) {
                    slideTo('prev')
                }
            })

            let slideIndexLabelX = document.querySelector('.property-gallery .tns-outer .tns-visually-hidden .current')
            slideIndexLabelX.textContent = '1'
            slideIndexLabelX.previousSibling.remove()
            propertyGallerySlider.events.on('indexChanged', () => {
                let slideIndexLabel = document.querySelector('.property-gallery .tns-outer .tns-visually-hidden .current')
                if (slideIndexLabel.previousSibling !== null) slideIndexLabel.previousSibling.remove()
                // update current slide with the display slide ID
                slideIndexLabel.textContent = propertyGallerySlider.getInfo().displayIndex
                // cap at max slide count
                if (parseInt(slideIndexLabel.textContent) > parseInt(slideIndexLabel.nextSibling.textContent.split(' ').pop())) {
                    slideIndexLabel.textContent = 1
                }
                slideIndexLabelX.closest('.property-gallery').setAttribute('data-slide-index', parseInt(slideIndexLabel.textContent))


                // change the 'current' active slide of propGal2 nanogallery to match index popup
                document.querySelector('body').setAttribute('data-propgal2-idx', propertyGallerySlider.getInfo().displayIndex - 1)
                document.querySelectorAll('.property-gallery2 .nGY2GallerySub .nGY2GThumbnail.nGY2GThumbnail_l1').forEach((thumb, idx) => {
                    thumb.classList.remove('current')
                })
                document.querySelectorAll('.property-gallery2 .nGY2GallerySub .nGY2GThumbnail.nGY2GThumbnail_l1').forEach((thumb, idx) => {
                    if (idx == propertyGallerySlider.getInfo().displayIndex - 1) {
                        thumb.classList.add('current')
                    }
                })
            })

            // clone gallery for popup custom first
            const node = document.getElementById("prop-gal")
            const clone = node.cloneNode(true)
            clone.setAttribute('class', 'property-gallery2')
            clone.setAttribute('id', 'prop-gal2')
            document.getElementById(document.querySelector('.property-gallery').getAttribute('id')).appendChild(clone)

            // call galleryPopup to make the slider
            Listing.galleryPopup(propertyGallerySlider, false)
        }
    },

    galleryPopup: function (slider = null, cloneSlider = false) {
        if (document.querySelectorAll('.property-gallery').length) {
            if (cloneSlider) {
                // clone gallery for popup custom first
                const node = document.getElementById("prop-gal")
                const clone = node.cloneNode(true)
                clone.setAttribute('class', 'property-gallery2 ngy2_container nGY2 nanogallery_gallerytheme_dark_prop-gal2')
                clone.setAttribute('id', 'prop-gal2')
                document.getElementById(document.querySelector('.property-gallery').getAttribute('id')).appendChild(clone)
            }

            const propGalMain = document.querySelector('#property-gallery')
            const propGal2 = document.querySelector('.property-gallery2')
            const galleryImg = document.querySelectorAll('.property-gallery2 .property-gallery__slider-item img') ? document.querySelectorAll('.property-gallery2 .property-gallery__slider-item:not(.property-gallery__slider-item--floorplan):not(.tns-slide-cloned) img') : null
            const galleryFloorplan = document.querySelectorAll('.property-gallery2 .property-floorplan__image img') ? document.querySelectorAll('.property-gallery2 .property-gallery__slider-item--floorplan img') : null
            const galleryVideo = document.querySelector('.property-sidebar__panel__item[data-video]') ? document.querySelector('.property-sidebar__panel__item[data-video]') : null

            let galIndex = 0
            let vidIndex = 0
            let floorplanIdx = []

            if (galleryImg !== null && galleryImg.length) {
                // set the images from gallery
                let itm = []
                galleryImg.forEach((img, ix) => {
                    if (itm.some(itx => itx.src === img.getAttribute('data-src'))) return
                    galIndex = ix + 1
                    itm.push(
                        {
                            src: img.getAttribute('data-src'),
                            srct: img.getAttribute('data-src'),
                            title: img.getAttribute('title')
                        }
                    )
                    if (ix === galleryImg.length - 1) document.querySelector('body').setAttribute('data-ngy2-floorplan', galIndex)
                })

                galleryFloorplan.forEach((img, ix) => {
                    if (itm.some(itx => itx.src === img.getAttribute('data-src'))) return
                    // get the index to set as floorplan pointer location
                    vidIndex = ix + 1
                    itm.push(
                        {
                            src: img.getAttribute('data-src'),
                            srct: img.getAttribute('data-src'),
                            title: img.getAttribute('title')
                        }
                    )
                    floorplanIdx.push(galIndex + (ix + 1))
                    if (ix === galleryFloorplan.length - 1) document.querySelector('body').setAttribute('data-ngy2-video', galIndex + vidIndex)
                })

                if (galleryVideo) {
                    if (galleryVideo.hasAttribute('data-video')) {
                        const dataVideoAttribute = galleryVideo.getAttribute('data-video')

                        // Push YouTube videos into the gallery player. The player has been super customised for YouTube, so
                        // we are adding a check here to make sure it is only YouTube videos that are added.
                        if (dataVideoAttribute.includes('youtube') || dataVideoAttribute.includes('youtu.be')) {
                            let galVideoUrl = ''

                            if (dataVideoAttribute.indexOf('?')) {
                                galVideoUrl = dataVideoAttribute.indexOf('/watch') ? dataVideoAttribute : dataVideoAttribute.split('?').shift()
                            } else {
                                galVideoUrl = dataVideoAttribute
                            }

                            // embed
                            if (galVideoUrl.indexOf('embed/')) {
                                galVideoUrl = galVideoUrl.split('embed/').pop()
                            }

                            // short
                            if (galVideoUrl.indexOf('youtu.be/')) {
                                galVideoUrl = galVideoUrl.split('youtu.be/').pop()
                            }

                            // full URL with /watch?v= param
                            if (galVideoUrl.indexOf('/watch?')) {
                                galVideoUrl = galVideoUrl.split('watch?').pop().replace('v=', '')
                                if (galVideoUrl.indexOf('&')) galVideoUrl.split('&').shift()
                                if (galVideoUrl.indexOf('=')) galVideoUrl.split('=').shift()
                            }

                            // push the filtered video ID only
                            itm.push({
                                src: 'https://www.youtube.com/watch?v=' + galVideoUrl,
                                title: galleryVideo.getAttribute('data-title')
                            })
                        }
                    }
                }

                let gal = $(".property-gallery2").nanogallery2({
                    // <!-- ### gallery settings ### -->
                    thumbnailHeight: 10,
                    thumbnailWidth: 16,
                    viewerGalleryTWidth: 48,
                    viewerGalleryTHeight: 36,
                    galleryMaxRows: 99,
                    galleryL1MaxRows: 99,
                    itemsBaseURL: window.location.host.includes('agentpoint') ? window.location.origin + '/ljh-dev/' : window.location.origin + '/',
                    locationHash: false,
                    // <!-- ### gallery content ### -->
                    items: itm,
                    imageTransition: 'slideAppear',
                    slideshowDelay: 2000,
                    viewerToolbar: {
                        display: true,
                        standard: 'label',
                        minimized: 'label',
                        position: 'top'
                    },
                    viewerTools: {
                        topLeft: 'closeButton',
                        topRight: 'pageCounter',
                    },
                    viewerHideToolsDelay: 50000,
                    fnImgDisplayed: desktopIndexChange,
                });
                gal.on('lightboxImageDisplayed.nanogallery2', renderIcon(this))
                gal.on('lightboxPreviousImage.nanogallery2', prevSlideshow)
                gal.on('lightboxNextImage.nanogallery2', nextSlideshow)
                gal.on('galleryRenderEnd.nanogallery2', setGalleryIndexes)
                gal.on('pageChanged.nanogallery2', desktopIndexChange)

                function slideToFloor(e) {
                    $('.gallery-action[data-action="floorplan"] .nGY2GThumbnail.nGY2GThumbnail_l1').eq(galIndex).attr('data-fp', 'true')
                }

                function thumbnailOpenImg(item) {
                    // galFloor.nanogallery2('reload')
                }

                function slideToVid(e) {
                    $('.gallery-action[data-action="video"] .nGY2GThumbnail.nGY2GThumbnail_l1').eq(galIndex + vidIndex).attr('data-vid', 'true')
                }

                function setGalleryIndexes() {
                    if (propGalMain !== null) {
                        propGalMain.setAttribute('data-floorplan-index', galIndex + 1)
                        propGalMain.setAttribute('data-video-index', galIndex + floorplanIdx.length + 1)
                    }
                }

                function desktopIndexChange() {
                    slider.goTo(gal.nanogallery2('data').lightbox.content.current.NGY2Item().mediaNumber - 1)
                }

                function renderIcon(e) {
                    // change the pagination
                    let popupPagi = document.querySelector('.toolbar .pageCounter')
                    if (popupPagi !== null) {
                        popupPagi.textContent = popupPagi.textContent.replace('/', ' of ')
                    }

                    // add property action button when popup is on
                    const propAction = document.querySelector('.property-gallery__actions')
                    if (propAction !== null) {
                        const popupToolbar = document.querySelector('.toolbarContainer')
                        if (popupToolbar !== null) {
                            if (!popupToolbar.querySelectorAll('.toolbarContainer .property-gallery__actions').length) popupToolbar.appendChild(propAction.cloneNode(true))

                            jQuery('.toolbarContainer .property-gallery__actions').on('click', '.property-gallery__actions__item', function () {
                                if (this.getAttribute('data-action') == 'video') $('.gallery-action[data-action="video"] .nGY2GThumbnail.nGY2GThumbnail_l1').eq(galIndex + vidIndex).attr('data-vid', 'true')
                                else if (this.getAttribute('data-action') == 'floorplan') slideToFloor()
                            })
                        }
                    }

                    // order image and floorplans / video
                    document.querySelectorAll('.nGY2viewerGallery .nGY2VThumbnailContainer .nGY2VThumbnail').forEach((el, id) => {
                        if (floorplanIdx.includes(parseInt(el.getAttribute('data-ngy2_idx')))) {
                            el.setAttribute('data-icon', 'floorplan')
                            el.setAttribute('data-order', '2')
                        }
                    })
                    $('.nGY2viewerGallery .nGY2VThumbnailContainer .nGY2VThumbnail[data-ngy2_idx="' + (galIndex + vidIndex + 1) + '"]').attr('data-icon', 'video')
                    $('.nGY2viewerGallery .nGY2VThumbnailContainer .nGY2VThumbnail[data-ngy2_idx="' + (galIndex + vidIndex + 1) + '"]').attr('data-order', '3')
                }

                function nextSlideshow(e) {
                    if (slider !== null) {
                        slider.goTo('next')
                    }
                }

                function prevSlideshow(e) {
                    if (slider !== null) {
                        slider.goTo('prev')
                    }
                }

                let touchStartX = 0
                let touchEndX = 0

                function checkNanoSwipeDir() {
                    if (touchStartX > touchEndX) {
                        touchDir = 'left'
                        jQuery('.nGY2 .nGY2ViewerAreaNext').click()
                        touchStartX = 0
                        touchEndX = 0
                        return
                    } else if (touchStartX < touchEndX) {
                        touchDir = 'right'
                        jQuery('.nGY2 .nGY2ViewerAreaPrevious').click()
                        return
                    } else {
                        touchDir = 'right'
                    }
                }

                document.addEventListener('touchstart', function (e) {
                    if (document.querySelector('body').classList.contains('nGY2_body_scrollbar')) {
                        const target = e.target.closest('.nGY2.nGY2ViewerContainer')
                        if (target) {
                            touchStartX = e.changedTouches[0].screenX
                            return
                        }
                    }
                })
                document.addEventListener('touchend', function (e) {
                    if (document.querySelector('body').classList.contains('nGY2_body_scrollbar')) {
                        const target = e.target.closest('.nGY2.nGY2ViewerContainer')
                        if (target) {
                            touchEndX = e.changedTouches[0].screenX
                            checkNanoSwipeDir()
                            return
                        }
                    }
                })

                // mobile touch swipe
                let touchStartTnsX = 0
                let touchEndTnsX = 0
                let touchTnsDir = 'none'

                function checkXSwipeDir() {
                    if (touchStartTnsX > touchEndTnsX) {
                        touchTnsDir = 'left'
                        slider.goTo('next')
                        touchStartTnsX = 0
                        touchEndTnsX = 0
                        return
                    } else if (touchStartTnsX < touchEndTnsX) {
                        touchTnsDir = 'right'
                        slider.goTo('prev')
                        return
                    } else {
                        touchTnsDir = 'right'
                    }
                }

                propGal2.addEventListener('touchstart', (e) => {
                    touchStartTnsX = e.changedTouches[0].screenX
                    return
                })
                propGal2.addEventListener('touchend', (e) => {
                    touchEndTnsX = e.changedTouches[0].screenX
                    checkXSwipeDir()
                    return
                })

                // desktop drag swipe
                let drag = false
                let dragStartX = 0
                let dragEndX = 0

                document.addEventListener('mousedown', (e) => {
                    if (e.target.matches('.property-gallery2 .nGY2GThumbnailCustomLayer')) {
                        drag = false
                        dragStartX = e.pageX
                    }
                }, {passive: true})
                document.addEventListener('mousemove', (e) => {
                    if (e.target.matches('.property-gallery2 .nGY2GThumbnailCustomLayer')) {
                        drag = true
                    }
                }, {passive: true})
                document.addEventListener('mouseup', (e) => {
                    if (e.target.matches('.property-gallery2 .nGY2GThumbnailCustomLayer')) {
                        if (drag) {
                            dragEndX = e.pageX
                            if (dragStartX < dragEndX) {
                                slider.goTo('prev')
                            } else if (dragStartX > dragEndX) {
                                slider.goTo('next')
                            }
                            drag = false
                            dragStartX = 0
                            dragEndX = 0
                        }
                    }
                }, {passive: true})


                // navigation icon triggers
                const actionImg = document.querySelector('.gallery-action[data-action="image"]')
                if (actionImg) {
                    actionImg.addEventListener('click', e => {
                        try {
                            gal.nanogallery2('closeViewer')
                            const floorPlanIndex = parseInt(propGalMain.getAttribute('data-floorplan-index'))
                            const videoIndex = parseInt(propGalMain.getAttribute('data-video-index'))
                            const currentIndex = parseInt(propGalMain.getAttribute('data-slide-index')) || 1
                            if(currentIndex >= floorPlanIndex || currentIndex >= videoIndex) {
                                gal.nanogallery2('displayItem', `0/1`)
                                slider.goTo("first")
                            }
                            else {
                                gal.nanogallery2('displayItem', `0/${currentIndex}`)
                                slider.goTo(currentIndex - 1)
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    })
                }

                const actionFloor = document.querySelector('.gallery-action[data-action="floorplan"]')
                if (actionFloor) {
                    actionFloor.addEventListener('click', e => {
                        gal.nanogallery2('closeViewer')
                        gal.nanogallery2('displayItem', `0/${galIndex + 1}`)
                        if (propGalMain !== null && propGalMain.getAttribute('data-floorplan-index') !== null) {
                            slider.goTo(parseInt(propGalMain.getAttribute('data-floorplan-index')) - 1)
                        }
                    })
                }

                const actionVideo = document.querySelector('.gallery-action[data-action="video"]')
                if (actionVideo) {
                    actionVideo.addEventListener('click', e => {
                        gal.nanogallery2('closeViewer')
                        gal.nanogallery2('displayItem', `0/${galIndex + floorplanIdx.length + 1}`)
                        if (propGalMain !== null && propGalMain.getAttribute('data-video-index') !== null) {
                            slider.goTo(parseInt(propGalMain.getAttribute('data-video-index')))
                        }
                    })
                }
            }

            // add custom link to redirect
            const galleryActions = document.querySelectorAll('.gallery-action')
            if (galleryActions.length) {
                galleryActions.forEach(act => {
                    if (act.getAttribute('data-redirect') != null && act.getAttribute('data-redirect').includes('http')) {
                        act.addEventListener('click', () => {
                            window.open(act.getAttribute('data-redirect'))
                        })
                    }
                })
            }

            // create mutation observer for nGY2ViewerMedia to track the transformation
            if (window.innerWidth < 768) {
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.attributeName === 'style') {
                            if (mutation.target.style.transform !== '') {

                                // only check on nGY2ViewerMedia
                                if (mutation.target.classList[0] === 'nGY2ViewerMedia') {
                                    let ngy2PopupImg = document.querySelectorAll('.nGY2 .nGY2ViewerMediaPan.imgCurrent img.nGY2ViewerMedia')
                                    if (ngy2PopupImg !== null) {
                                        let curPos = mutation.target.style?.transform?.replace('translate(', '').replace(')', '').split(',')
                                        let curPosNum = []
                                        curPos[1] = curPos[1].split(' ')[1]
                                        curPos.forEach(pos => {
                                            pos = parseInt(pos.replace('px', ''))
                                            curPosNum.push(pos)
                                        })

                                        // constraint the image to padded edge based on viewport
                                        if (curPosNum[0] > window.outerWidth - 50) {
                                            mutation.target.style = `opacity: 0.8; visibility: visible; height: ${mutation.target.style.height}; width: ${mutation.target.style.height}; transform: translate(${window.outerWidth - 60}px, ${curPosNum[1]}px) rotate(0deg);`
                                        }
                                        if (curPosNum[0] < -(mutation.target.width) + 50) {
                                            mutation.target.style = `opacity: 0.8; visibility: visible; height: ${mutation.target.style.height}; width: ${mutation.target.style.height}; transform: translate(${-(mutation.target.width) + 60}px, ${curPosNum[1]}px) rotate(0deg);`
                                        }
                                        if (curPosNum[1] > mutation.target.height / 2 + 80) {
                                            mutation.target.style = `opacity: 0.8; visibility: visible; height: ${mutation.target.style.height}; width: ${mutation.target.style.height}; transform: translate(${curPosNum[0]}px, ${mutation.target.height / 2 + 60}px) rotate(0deg);`
                                        }
                                        if (curPosNum[1] < -mutation.target.height / 2 - 80) {
                                            mutation.target.style = `opacity: 0.8; visibility: visible; height: ${mutation.target.style.height}; width: ${mutation.target.style.height}; transform: translate(${curPosNum[0]}px, ${-mutation.target.height / 2 - 60}px) rotate(0deg);`
                                        }
                                    }
                                }
                            }
                        }
                    })
                })

                observer.observe(document.querySelector('body'), {
                    attributes: true,
                    childList: false,
                    subtree: true
                })
            }
        }
    },

    listingHeaderShare: function () {
        if (document.querySelector('#listing-header-share') !== null && document.querySelectorAll('.popup-share').length) {
            const listingShareButton = document.querySelector('#listing-header-share');
            const popupShare = document.querySelector('.popup-share');

            listingShareButton.addEventListener('click', function () {
                popupShare.classList.toggle('popup--open');
            })
        }
    },

    listingHeaderNavigation: function () {
        if (document.querySelectorAll('.property-header__mobile-nav .property-header__mobile-nav__menu').length) {
            const headerNavToggler = document.querySelector('.property-header__mobile-nav .property-header__toggle');
            const headerNavMenu = document.querySelector('.property-header__mobile-nav .property-header__mobile-nav__menu');
            const headerNavMenuItem = headerNavMenu.querySelectorAll('.property-header__mobile-nav__menu__item');

            // toggle expand menu container
            headerNavToggler.addEventListener('click', () => {
                headerNavMenu.classList.toggle('property-header__mobile-nav__menu--expand');
                headerNavMenu.classList.toggle('property-header__mobile-nav__menu--expand-full');
                headerNavToggler.classList.toggle('property-header__toggle--expand');
                if (headerNavMenu.classList.contains('property-header__mobile-nav__menu--expand-full')) {
                    headerNavMenu.classList.add('property-header__mobile-nav__menu--expand');
                }
                if (!headerNavMenu.classList.contains('property-header__mobile-nav__menu--expand-full') && !headerNavMenu.classList.contains('property-header__mobile-nav__menu--expand')) {
                    headerNavToggler.classList.remove('property-header__toggle--expand');
                }
            })

            // toggle full view or "more" menu container with label
            headerNavMenuItem.forEach((item) => {
                item.addEventListener('click', () => {
                    if (item.classList.contains('property-header__mobile-nav__menu__item-toggle')) {
                        headerNavMenu.classList.toggle('property-header__mobile-nav__menu--expand-full');
                    }

                    // toggle share popup
                    if (item.querySelector('.img-icon--share') !== null && document.querySelectorAll('.popup-share').length) {
                        const popupShare = document.querySelector('.popup-share');
                        popupShare.classList.add('popup--open');
                    }

                })
            })
        }
    },

    listingHeaderFavourite: function () {
        if (document.querySelectorAll('.property-header__favourite').length) {
            const listingHeaderFav = document.querySelectorAll('.property-header__favourite')

            listingHeaderFav.forEach((favButton) => {
                favButton.addEventListener('click', function () {
                    this.classList.toggle('property-header__favourite--active')
                    this.classList.contains('property-header__favourite--active') ? this.querySelector('.label').innerText = 'Favourited' : this.querySelector('.label').innerText = 'Favourite'
                })
            })
        }
    },

// listing sidebar panel accordion toggle
    listingSidebarPanel: function () {
        if (document.querySelectorAll('.property-sidebar__panel').length) {
            const sidebarPanels = document.querySelectorAll('.property-sidebar__panel');
        }
    },

// listing how we can help section custom select
    listingQuestionSelect: function () {
        if (document.querySelector('#listing-question') != null) {
            const listingQuestionsSelects = document.querySelectorAll('.listing-question select');
            listingQuestionsSelects.forEach((selectEl) => {
                NiceSelect.bind(document.getElementById(selectEl.getAttribute('id')));

                document.querySelectorAll('.listing-question__field .nice-select .current').forEach((cusSelect) => {
                    if (cusSelect.innerText == selectEl.querySelector('option').innerText) {
                        cusSelect.style.color = '#847F7F'
                        cusSelect.style.fontWeight = '300'
                        cusSelect.setAttribute('data-init', 'true')
                    }
                    cusSelect.parentElement.addEventListener('click', () => {
                        if (cusSelect.innerText != selectEl.querySelector('option').innerText) {
                            cusSelect.removeAttribute('style')
                        }
                    })
                })
            })
        }
    },

    listingQuestionSubmit: function () {
        if (document.querySelectorAll('.popup-confirmation').length) {
            const questionForm = document.querySelector('.listing-question__form')
            const questionChecks = document.querySelectorAll('.question-checks input[type="checkbox"]')
            const questionInput = document.querySelector('.question-input')
            const questionTypes = document.querySelector('.listing-question__types')
            const tncCheck = document.querySelector('#question-tnc-listing')
            const questionButton = document.querySelector('.listing-question__button')

            let checkcount = 0

            questionTypes.addEventListener('click', () => {
                questionChecks.forEach((_) => {
                    if (_.checked) {
                        checkcount += 1
                    }
                })
                if (checkcount > 0) {
                    questionInput.value = checkcount
                }
            })

            questionButton.addEventListener('click', () => {
                if (!tncCheck.checked) {
                    tncCheck.classList.add('error')
                } else {
                    tncCheck.classList.remove('error')
                }
            });
        }
    },

    mediaToggle: function () {
        if (document.querySelectorAll('.property-media').length && document.querySelectorAll('.property-gallery').length) {

            const toggleFeature = document.querySelector('.property-sidebar__panel__item[href="#property-feature"]');
            if (toggleFeature !== null) {
                toggleFeature.addEventListener('click', (ev) => {
                    ev.preventDefault();
                    if (document.querySelector('.property-overview__copy').classList.contains('container-crop')) {
                        document.querySelector('.property-overview__copy').classList.add('container-crop--expand');
                    }
                })
            }

        }
    },

    sidebarMenuToggle: function () {
        if (document.querySelectorAll('.property-sidebar__panel__item').length) {
            const sidebarMenus = document.querySelectorAll('.property-sidebar__panel__item');
            const listingSections = document.querySelectorAll('section[class*="property-"]');
            const listingMap = document.querySelector('#property-map')
            let mainbarScroll = OverlayScrollbars(document.querySelectorAll('.property-mainbar__wrapper'), {
                callbacks: {
                    onScroll: function () {
                        listingSections.forEach((section) => {
                            if (App.isInViewport(section)) {
                                section.classList.add('section--viewed');
                            }
                        })
                        if (App.isInViewport(listingMap)) {
                            listingMap.classList.add('section--viewed');
                        }
                    }
                }
            });
            if (window.outerWidth <= 767.98) {
                mainbarScroll.destroy();
            }

            // scroll by click on sidebar menu
            sidebarMenus.forEach((menu) => {
                menu.addEventListener('click', () => {
                    if (document.querySelector(menu.getAttribute('href')) !== null && menu.getAttribute('data-href') !== 'property-floorplan' && menu.getAttribute('href') !== '#property-gallery' && menu.getAttribute('href') !== '#listing-question') {
                        let mainbarScrollTarget = document.querySelector(menu.getAttribute('href'));
                        if (menu.getAttribute('href').indexOf('property-map')) document.querySelector(menu.getAttribute('href')).classList.add('section--viewed')
                        mainbarScroll.scroll({
                            el: mainbarScrollTarget,
                            margin: 120
                        }, 1000)
                    }
                })
            });

            // toggle remove or add custom scroll on mobile when resized
            window.addEventListener('resize', () => {
                if (window.outerWidth <= 767.98) {
                    mainbarScroll.destroy();
                } else {
                    if (!document.querySelector('.property-mainbar__wrapper').classList.contains('os-host-overflow')) {
                        mainbarScroll = OverlayScrollbars(document.querySelectorAll('.property-mainbar__wrapper'), {
                            callbacks: {
                                onScroll: function () {
                                    listingSections.forEach((section) => {
                                        if (App.isInViewport(section)) {
                                            section.classList.add('section--viewed');
                                        }
                                    })
                                    if (App.isInViewport(listingMap)) {
                                        listingMap.classList.add('section--viewed');
                                    }
                                }
                            }
                        });
                    }
                }
            })
        }
    },

    customScrollbar: function () {
        if (document.querySelector('.property-mainbar__wrapper') !== null) {
            // const mainbarScroll = OverlayScrollbars(document.querySelectorAll('.property-mainbar__wrapper'), {});
        }
    },

    listingVideo: function () {
        // handle video item on click to shown on popup
        if (document.querySelector('#video-player') !== null && document.querySelector('.property-sidebar__panel__item[href="#property-video"]') !== null) {
            const vidPlayer = new Plyr('#video-player'); // listing
            const popupListingVideo = document.querySelector('#popup-agent-video');
            const popupListingVideoClose = document.querySelector("#popup-agent-video .popup__close");
            const listingVideoToggle = document.querySelector('.property-sidebar__panel__item[href="#property-video"]');
            const listingActionVideoToggle = document.querySelector('.gallery-action[data-action="video"]');
            const listingVideoMobileToggle = document.querySelector('.property-header__mobile-nav__menu__item[href="#property-video"]');
            const galleryVideo = document.querySelector('.property-sidebar__panel__item[data-video]') ? document.querySelector('.property-sidebar__panel__item[data-video]') : null

            // change video source dynamically on click
            listingVideoToggle.addEventListener('click', () => {
                if (listingVideoToggle.getAttribute('data-video') != null) {
                    vidPlayer.source = {
                        type: 'video',
                        sources: [{
                            src: listingVideoToggle.getAttribute('data-video'),
                            provider: listingVideoToggle.getAttribute('data-provider') !== null ? listingVideoToggle.getAttribute('data-provider') : 'youtube',
                        },],
                    };
                }
                popupListingVideo.classList.toggle('popup--open');
            })

            if (galleryVideo.getAttribute('data-video') && galleryVideo.getAttribute('data-video').includes('vimeo')) {
                listingActionVideoToggle.addEventListener('click', () => {
                    if (listingActionVideoToggle.getAttribute('data-video')) {
                        vidPlayer.source = {
                            type: 'video',
                            sources: [{
                                src: listingActionVideoToggle.getAttribute('data-video'),
                                provider: listingActionVideoToggle.getAttribute('data-provider') !== null ? listingActionVideoToggle.getAttribute('data-provider') : 'youtube',
                            },],
                        };
                    }

                    popupListingVideo.classList.toggle('popup--open');
                })
            }


            listingVideoMobileToggle.addEventListener('click', () => {
                if (listingVideoToggle.getAttribute('data-video') != null) {
                    vidPlayer.source = {
                        type: 'video',
                        sources: [{
                            src: listingVideoToggle.getAttribute('data-video'),
                            provider: listingVideoToggle.getAttribute('data-provider') !== null ? listingVideoToggle.getAttribute('data-provider') : 'youtube',
                        },],
                    };
                }
                popupListingVideo.classList.toggle('popup--open');
            })

            // close popup
            popupListingVideoClose.addEventListener('click', () => {
                popupListingVideo.classList.remove('popup--open')
                vidPlayer.stop() // stop listing video.
            })
        }
    },

// chart round svg
    listingChartRound: function () {
        const circles = document.querySelectorAll('.chart .chart__circle__value');
        const circleSvg = document.querySelectorAll('.chart__circle');

        circles.forEach((circle) => {
            const radius = circle.r.baseVal.value;
            let circumference = radius * 2 * Math.PI;

            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = `${circumference}`;

            // set the progress bar by percentage
            // alternate = mirror the direction to clockwise
            function setProgress(percent, alternate = false) {
                const offset = circumference - percent / 100 * circumference;
                if (alternate === true) {
                    circle.style.strokeDashoffset = offset;
                } else {
                    circle.style.strokeDashoffset = -offset;
                }
            }

            if (circle.closest('.chart').hasAttribute('data-value')) {
                if (circle.closest('.chart').classList.contains('chart--round-progress--alternate')) {
                    setProgress(circle.closest('.chart').getAttribute('data-value'), true);
                } else {
                    setProgress(circle.closest('.chart').getAttribute('data-value'), false);
                }
            } else {
                setProgress(0);
            }
        })

        // set sizing on load
        circleSvg.forEach((item) => {
            item.setAttribute('style', `width:${item.closest('.chart').getBoundingClientRect().width}px; height:${item.closest('.chart').getBoundingClientRect().height}px`);
            item.querySelector('.chart__circle__value').setAttribute('r', item.closest('.chart').getBoundingClientRect().width / 2);
            item.querySelector('.chart__circle__value').setAttribute('cx', item.closest('.chart').getBoundingClientRect().width / 2);
            item.querySelector('.chart__circle__value').setAttribute('cy', item.closest('.chart').getBoundingClientRect().width / 2);
            item.setAttribute('viewBox', `0 0 ${item.closest('.chart').getBoundingClientRect().height} ${item.closest('.chart').getBoundingClientRect().height}`)
            item.setAttribute('height', item.closest('.chart').getBoundingClientRect().height);
            item.setAttribute('width', item.closest('.chart').getBoundingClientRect().width);
        })

        // set responsiveness on resize
        window.addEventListener('resize', () => {
            circleSvg.forEach((item) => {
                item.setAttribute('style', `width:${item.closest('.chart').getBoundingClientRect().width}px; height:${item.closest('.chart').getBoundingClientRect().height}px`);
                item.querySelector('.chart__circle__value').setAttribute('r', item.closest('.chart').getBoundingClientRect().width / 2);
                item.querySelector('.chart__circle__value').setAttribute('cx', item.closest('.chart').getBoundingClientRect().width / 2);
                item.querySelector('.chart__circle__value').setAttribute('cy', item.closest('.chart').getBoundingClientRect().width / 2);
                item.setAttribute('viewBox', `0 0 ${item.closest('.chart').getBoundingClientRect().height} ${item.closest('.chart').getBoundingClientRect().height}`)
                item.setAttribute('height', item.closest('.chart').getBoundingClientRect().height);
                item.setAttribute('width', item.closest('.chart').getBoundingClientRect().width);
            })
        })

    },

// chart.js Chart line market trends
    listingMarketTrend: function () {
        if (document.querySelectorAll('.chart-market').length) {
            const ctxs = document.querySelectorAll('.property-market-trend .chart');

            const DATA_COUNT = 12;
            const labels = [];
            for (let i = 0; i < DATA_COUNT; ++i) {
                labels.push(i.toString());
            }

            ctxs.forEach((ctx) => {
                const datapoints = ctx.getAttribute('data-value-months').split(',');
                const datalabel = ctx.getAttribute('data-label-months').split(',');

                // set the data
                const data = {
                    labels: datalabel,
                    datasets: [{
                        label: 'Market Trends',
                        data: datapoints,
                        borderColor: '#F9A63A',
                        borderWidth: 1,
                        fill: false,
                        cubicInterpolationMode: 'monotone',
                        tension: 0.6
                    }]
                };

                // make the chart based on data above
                const myChart = new Chart(ctx, {
                    type: 'line',
                    data: data,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: false,
                                text: 'Chart Market Trends'
                            },
                            tooltips: {
                                enabled: false,
                            },
                            legend: {
                                display: false,
                            }
                        },
                        interaction: {
                            intersect: false,
                        },
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: false,
                                },
                                ticks: {
                                    callback: function (value, index, values) {
                                        return datalabel[index];
                                    }
                                }
                            },
                            y: {
                                display: true,
                                title: {
                                    display: false,
                                },
                                min: Math.min(datapoints),
                                max: Math.max(datapoints),
                                grid: {
                                    offset: false,
                                },
                                grace: '5%',
                                ticks: {
                                    callback: function (value, index, values) {
                                        return index % 2 === 0 ? '$' + (Math.round(value * 10) / 10) + 'M' : '';
                                    }
                                }
                            }
                        }
                    },
                });
            })
        }
    },

// responsive small screen, market trend chart will be big as tab's nav width
    chartMarketTrendResponsive: function () {
        if (document.querySelectorAll('.property-market-trend').length) {
            let marketChartPanel = document.querySelectorAll('.property-market__panel .chart-market-wrapper');
            let marketChartNavContainer = document.querySelector('.property-market__tab-nav');

            if (window.innerWidth <= 1024.98) {
                marketChartPanel.forEach((panel) => {
                    panel.setAttribute('style', `width:${marketChartNavContainer.scrollWidth + 50}px;`);
                })
            } else {
                marketChartPanel.forEach((panel) => {
                    panel.setAttribute('style', `width:100%;`);
                })
            }

            window.addEventListener('resize', () => {
                if (window.innerWidth <= 1024.98) {
                    marketChartPanel.forEach((panel) => {
                        panel.setAttribute('style', `width:${marketChartNavContainer.scrollWidth + 50}px;`);
                    })
                } else {
                    marketChartPanel.forEach((panel) => {
                        panel.setAttribute('style', `width:100%;`);
                    })
                }
            })
        }
    },

    floatingBarView: function () {
        const listingSections = document.querySelectorAll('section[class*="property-"]');
        const scrollableCustom = document.querySelector('.property-mainbar__wrapper')
        document.addEventListener('scroll', (event) => {
            listingSections.forEach((section) => {
                if (App.isInViewport(section)) {
                    if (!section.classList.contains('section--viewed')) {
                        section.classList.add('section--viewed');
                    }
                }
            })
        }, false);
    },

// agent's listings mobile slider
    listingPropertyMobile: function () {
        if (document.querySelectorAll('.property-listings .listings').length) {
            const listingProperties = document.querySelectorAll('.property-listings .listings');
            let saleSlider, soldSlider;

            if (document.querySelectorAll('.property-listings [data-panel="listing-sale"] .listings').length) {
                saleSlider = App.makeSlider('.property-listings [data-panel="listing-sale"] .listings', 1, false);
            }
            if (document.querySelectorAll('.property-listings [data-panel="listing-sold"] .listings').length) {
                soldSlider = App.makeSlider('.property-listings [data-panel="listing-sold"] .listings', 1, false);
            }

            if (window.innerWidth >= 768) {
                if (document.querySelectorAll('.property-listings [data-panel="listing-sale"] .listings').length && typeof saleSlider !== 'undefined' && saleSlider !== null) saleSlider.destroy();
                if (document.querySelectorAll('.property-listings [data-panel="listing-sold"] .listings').length && typeof soldSlider !== 'undefined' && soldSlider !== null) soldSlider.destroy();
            }
            window.addEventListener('resize', () => {
                if (window.innerWidth <= 767) {
                    saleSlider = App.makeSlider('.property-listings [data-panel="listing-sale"] .listings', 1, false);
                    soldSlider = App.makeSlider('.property-listings [data-panel="listing-sold"] .listings', 1, false);
                } else {
                    if (document.querySelectorAll('.property-listings [data-panel="listing-sale"] .listings.tns-slider').length && typeof saleSlider !== 'undefined' && saleSlider !== null) saleSlider.destroy();
                    if (document.querySelectorAll('.property-listings [data-panel="listing-sold"] .listings.tns-slider').length && typeof soldSlider !== 'undefined' && soldSlider !== null) soldSlider.destroy();
                }
            })
        }
    },

// Property fav toggle
    listingPropertyFavourite: function () {
        if (document.querySelectorAll('.listings__item__fav').length) {
            const listingFavButtons = document.querySelectorAll('.listings__item__fav');

            listingFavButtons.forEach((fav) => {
                fav.addEventListener('click', function (e) {
                    e.preventDefault();
                    this.classList.toggle('listings__item__fav--active');
                })
            })
        }
    }
}

window.onload = () => {
    App.init();
    Listing.init();
}


function checkScrollEnd() {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    const docHeight = $(document).height();

    if (scrollTop + windowHeight >= docHeight - 1) {
        $('body').addClass('end-of-scroll');
    } else {
        $('body').removeClass('end-of-scroll');
    }
}

$(window).on('scroll', checkScrollEnd);
$(document).ready(checkScrollEnd);