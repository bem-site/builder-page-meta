var vow = require('vow'),
    should = require('should'),
    Config = require('bs-builder-core/lib/config'),
    Model = require('bs-builder-core/lib/model/model'),
    PageHeaderTitle = require('../../lib/tasks/page-header-title');

describe('PageHeaderTitle', function () {
    it('should return valid task name', function () {
        PageHeaderTitle.getName().should.equal('create page titles');
    });

    describe('instance methods', function () {
        var config,
            task;

        before(function () {
            config = new Config('debug');
            config.setLanguages(['en', 'ru']);
            task = new PageHeaderTitle(config, {});
        });

        describe('_getPagesMap', function () {
            it ('should build valid pages map', function () {
                var pages = [
                        {
                            url: '/',
                            en: { title: 'index en title' },
                            ru: { title: 'index ru title' }
                        },
                        {
                            url: '/url1',
                            ru: { title: 'url1 ru title' }
                        },
                        {
                            url: '/url2',
                            en: { title: 'url2 en title' },
                            ru: { title: 'url2 ru title' }
                        }
                    ],
                    languages = ['en', 'ru'],
                    pagesMap = task._getPagesMap(pages, languages);

                pagesMap.get('/').get('en').should.equal('index en title');
                pagesMap.get('/').get('ru').should.equal('index ru title');

                pagesMap.get('/url1').get('ru').should.equal('url1 ru title');

                pagesMap.get('/url2').get('en').should.equal('url2 en title');
                pagesMap.get('/url2').get('ru').should.equal('url2 ru title');
            });
        });

        describe('_getParentUrls', function () {
            it('should get parent urls for index page', function () {
                should.deepEqual(task._getParentUrls({ url: '/' }), ['/']);
            });

            it('should get parent urls for first level', function () {
                should.deepEqual(task._getParentUrls({ url: '/url1' }), ['/', '/url1']);
            });

            it('should get parent urls for second level', function () {
                should.deepEqual(task._getParentUrls({ url: '/url1/url2' }), ['/', '/url1', '/url1/url2']);
            });

            it('should get parent urls for third level', function () {
                should.deepEqual(task._getParentUrls({ url: '/url1/url2/url3' }),
                    ['/', '/url1', '/url1/url2', '/url1/url2/url3']);
            });
        });

        describe('run', function () {
            it('should add header.title to pages', function (done) {
                var pages = [
                        {
                            url: '/',
                            en: { title: 'index en title' },
                            ru: { title: 'index ru title' }
                        },
                        {
                            url: '/url1',
                            ru: { title: 'url1 ru title' }
                        },
                        {
                            url: '/url1/url2',
                            ru: { title: 'url2 ru title' }
                        }
                    ],
                    model = new Model();
                model.setPages(pages);
                task.run(model).then(function (m) {
                    m.getPages()[0]['en'].header.title
                        .should.equal('index en title');
                    m.getPages()[0]['ru'].header.title
                        .should.equal('index ru title');
                    m.getPages()[1]['ru'].header.title
                        .should.equal('url1 ru title/index ru title');
                    m.getPages()[2]['ru'].header.title
                        .should.equal('url2 ru title/url1 ru title/index ru title');
                    done();
                });
            });
        });
    });
});
