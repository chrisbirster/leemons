const { validateLocaleCode } = require('../../validations/locale');

// A mixing for extending all the needed classes
module.exports = (Base) =>
  class LocalizationDelete extends Base {
    /**
     * Deletes the localization that matches the tuple [key, locale]
     * @param {LocalizationKey} key the entry key
     * @param {LocaleCode} locale the locale code
     * @returns {Promise<boolean>} if the locale was deleted or not
     */
    async delete(key, locale) {
      const tuple = this.validateLocalizationTuple({ key, locale });

      try {
        // Delete the given tuple
        return (await this.model.deleteMany(tuple)).count === 1;
      } catch (e) {
        leemons.log.debug(e.message);
        throw new Error('An error occurred while deleting the localization');
      }
    }

    /**
     * Deletes the localizations that matches the key prefix
     *
     * If not locale provided, remove all the keys matching the prefix in any locale
     *
     * @param {LocalizationKey} key The key prefix
     * @param {LocaleCode} [locale] the locale code
     * @returns {Promise<number>} how many localizations where deleted
     */
    async deleteKeyStartsWith(key, locale = null) {
      const query = {
        // Validate key and get it lowercased
        key_$startsWith: this.validateLocalizationKey(key),
      };

      if (locale) {
        // Validate locales and get it lowercased
        query.locale = validateLocaleCode(locale);
      }

      try {
        return (await this.model.deleteMany(query)).count;
      } catch (e) {
        leemons.log.debug(e.message);
        throw new Error('An error occurred while deleting the localizations');
      }
    }

    /**
     * Deletes the localizations that matches the tuple [key, locale]
     * @param {Array<LocalizationKey, LocaleCode>[]} localizations An array of [key, locale]
     * @returns {Promise<Number>} The number of localizations deleted
     */
    async deleteMany(localizations) {
      // Validates the input and returns an array of LocalizationTuples ([{key, locale}])
      const _localizations = this.validateLocalizationTupleArray(localizations);

      try {
        return (await this.model.deleteMany({ $or: _localizations })).count;
      } catch (e) {
        leemons.log.debug(e.message);
        throw new Error('An error occurred while deleting the localizations');
      }
    }

    /**
     * Deletes all the entries mathching a key or locale
     * @param {object} params
     * @param {LocalizationKey} [params.key] The key to delete
     * @param {LocaleCode} [params.locale] The locale to delete
     * @returns {number} the number of items deleted
     */
    async deleteAll({ key = null, locale = null }) {
      const query = {};

      if (key) {
        query.key = this.validateLocalizationKey(key);
      }
      if (locale) {
        query.locale = validateLocaleCode(locale);
      }

      if (!query.key && !query.locale) {
        throw new Error('At least one parameter should be provided');
      }

      try {
        return (await this.model.deleteMany(query)).count;
      } catch (e) {
        leemons.log.debug(e.message);
        throw new Error('An error occurred while deleting the localizations');
      }
    }
  };
