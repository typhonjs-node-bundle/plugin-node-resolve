const commonjs          = require('@rollup/plugin-commonjs');
const { nodeResolve }   = require('@rollup/plugin-node-resolve');

/**
 * Handles interfacing with the plugin manager adding event bindings to pass back configured
 * instances of `@rollup/plugin-node-resolve` & `@rollup/plugin-commonjs`.
 */
class PluginLoader
{
   /**
    * Returns the `package.json` module name.
    *
    * @returns {string}
    */
   static get pluginName() { return '@typhonjs-node-rollup/plugin-node-resolve'; }

   /**
    * Returns the rollup plugins managed.
    *
    * @returns {string[]}
    */
   static get rollupPlugins() { return ['@rollup/plugin-commonjs', '@rollup/plugin-node-resolve']; }

   /**
    * Returns the configured input plugin for `@rollup/plugin-replace`
    *
    * @returns {object[]} Rollup plugins
    */
   static getInputPlugin()
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
      ev.eventbus.on('typhonjs:oclif:bundle:plugins:npm:input:get', PluginLoader.getInputPlugin, PluginLoader);
   }
}

module.exports = PluginLoader;