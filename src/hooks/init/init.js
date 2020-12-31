const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');

/**
 * Handles interfacing with the plugin manager adding event bindings to pass back configured
 * instances of `@rollup/plugin-node-resolve` & `@rollup/plugin-commonjs`.
 */
class PluginHandler
{
   /**
    * Returns the configured input plugin for `@rollup/plugin-replace`
    *
    * @param {object} bundleData        - The CLI config
    * @param {object} bundleData.cliFlags  - The CLI config
    *
    * @returns {object} Rollup plugin
    */
   static getInputPlugin(bundleData = {})
   {
      return [nodeResolve({ browser: true }), commonjs()];
   }

   /**
    * Wires up PluginHandler on the plugin eventbus.
    *
    * @param {PluginEvent} ev - The plugin event.
    *
    * @see https://www.npmjs.com/package/typhonjs-plugin-manager
    *
    * @ignore
    */
   static onPluginLoad(ev)
   {
      ev.eventbus.on('typhonjs:oclif:rollup:plugins:npm:input:get', PluginHandler.getInputPlugin, PluginHandler);
   }
}

/**
 * Oclif init hook to add PluginHandler to plugin manager.
 *
 * @param {object} opts - options of the CLI action.
 *
 * @returns {Promise<void>}
 */
module.exports = async function(opts)
{
   try
   {
      global.$$pluginManager.add({ name: 'plugin-node-resolve', instance: PluginHandler });

      // TODO REMOVE
      process.stdout.write(`plugin-node-resolve init hook running ${opts.id}\n`);
   }
   catch (error)
   {
      this.error(error);
   }
};
