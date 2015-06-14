import _ from 'lodash';
import vow from 'vow';
import PageBase from './page-base';

export default class PageHeaderTitle extends PageBase {

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
     * Performs task
     * @returns {Promise}
     */
    run(model) {
        this.beforeRun();

        var languages = this.getBaseConfig().getLanguages(),
            pagesMap = this.getPagesMap(model.getPages(), languages);

        model.getPages().forEach(page => {
            var urlSet = this.getParentUrls(page).reverse();
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




