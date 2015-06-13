import _ from 'lodash';
import vow from 'vow';
import builderCore from 'bs-builder-core';

export default class PageHeaderTitle extends builderCore.tasks.Base {

    static getLoggerName() {
        return module;
    }

    /**
     * Return task human readable description
     * @returns {string}
     */
    static getName() {
        return 'create page titles';
    }

    /**
     * Creates map url -> lang -> title
     * @param {Array} pages - array of model pages
     * @param {Array} languages - array of configured languages
     * @returns {Object}
     * @private
     */
    /*
    _getPagesMap(pages, languages) {
        return pages.reduce((prevPages, page) => {
            prevPages[page.url] = languages.reduce((prevPage, language) => {
                if (page[language]) {
                    prevPage[language] = page[language].title;
                }
                return prevPage;
            }, {});
            return prevPages;
        }, {});
    }*/

    /**
     * Creates map url -> lang -> title
     * @param {Array} pages - array of model pages
     * @param {Array} languages - array of configured languages
     * @returns {Object}
     * @private
     */
    _getPagesMap(pages, languages) {
        return pages.reduce((pagesMap, page) => {
            pagesMap.set(page.url, languages.reduce((pageMap, language) => {
                if (page[language]) {
                    pageMap.set(language, page[language].title);
                }
                return pageMap;
            }, new Map()));
            return pagesMap;
        }, new Map());
    }

    /**
     * Retrieves array with url of given page and all parent urls
     * @param {Object} page - page model object
     * @returns {Array<String>}
     * @private
     */
    _getParentUrls(page) {
        const DELIMETER = '/';
        var chunks = page.url.split(DELIMETER),
            result = [DELIMETER];

        for(let i = 1; i < chunks.length; i++) {
            let url = '';
            for(let j = 0; j <= i; j++) {
                if(chunks[j].length) {
                    url += (DELIMETER + chunks[j]);
                }
            }
            if(url.length) {
                result.push(url);
            }
        };
        return result;
    }

    /**
     * Performs task
     * @returns {Promise}
     */
    run(model) {
        this.beforeRun();

        var languages = this.getBaseConfig().getLanguages(),
            pagesMap = this._getPagesMap(model.getPages(), languages);

        model.getPages().forEach(page => {
            var urlSet = this._getParentUrls(page).reverse();
            languages.forEach(language => {
                if(page[language]) {
                    page[language].header = page[language].header || {};
                    page[language].header.title = urlSet.map(url => {
                        return pagesMap.get(url).get(language);
                    }).join('/');
                }
            });
        });

        return Promise.resolve(model);
    }
}




