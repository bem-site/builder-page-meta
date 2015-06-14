import _ from 'lodash';
import vow from 'vow';
import builderCore from 'bs-builder-core';

export default class PageHeaderMeta extends builderCore.tasks.Base {

    static getLoggerName() {
        return module;
    }

    /**
     * Return task human readable description
     * @returns {string}
     */
    static getName() {
        return 'create page header meta-information';
    }

    /**
     * Add header meta-information data to page
     * @param {Object} page - page model object
     * @param {String} language
     * @private
     */
    _addMetaToPage(page, language) {
        var p = page[language],
            getKeywords = _p => {
                return _p.tags ? _p.tags.join(', ') : '';
            };

        if(!p) {
            return;
        }
        p.header = p.header || {};
        p.header.meta = {
            ogUrl: page.url,
            ogType: 'article',
            description: p.title,
            ogDescription: p.title,
            keywords: getKeywords(p),
            ogKeywords: getKeywords(p)
        };
    }

    /**
     * Performs task
     * @returns {Promise}
     */
    run(model) {
        this.beforeRun();

        var languages = this.getBaseConfig().getLanguages();
        model.getPages().forEach(page => {
            languages.forEach(language => {
                this._addMetaToPage(page, language);
            });
        });

        return Promise.resolve(model);
    }
}





