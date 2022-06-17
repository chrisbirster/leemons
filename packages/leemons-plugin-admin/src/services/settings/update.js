const _ = require('lodash');
const { table } = require('../tables');
const findOne = require('./findOne');

/**
 * @public
 * @static
 * @return {Promise<any>}
 * */
async function update(settings, { transacting: _transacting } = {}) {
  if (
    this.calledFrom.startsWith('plugins.mvp-template') ||
    this.calledFrom.startsWith('plugins.admin')
  ) {
    return global.utils.withTransaction(
      async (transacting) => {
        let currentSettings = await findOne({ transacting });
        if (_.isNil(currentSettings)) {
          currentSettings = await table.settings.create({ configured: false }, { transacting });
        }
        const newSettings = { ...currentSettings, ...settings };
        delete newSettings.id;

        return table.settings.update({ id: currentSettings.id }, newSettings, { transacting });
      },
      table.settings,
      _transacting
    );
  }

  throw new Error('This method can only be called from the plugins.admin');
}

module.exports = update;
