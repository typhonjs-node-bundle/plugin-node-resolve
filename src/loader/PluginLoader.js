import commonjs   from '@rollup/plugin-commonjs';
import PNR        from '@rollup/plugin-node-resolve';

const s_CONFLICT_PACKAGES = ['@rollup/plugin-commonjs', '@rollup/plugin-node-resolve'];
const s_PACKAGE_NAME = '@typhonjs-oclif-rollup/plugin-node-resolve';

/**
 * Handles interfacing with the plugin manager adding event bindings to pass back configured
 * instances of `@rollup/plugin-node-resolve` & `@rollup/plugin-commonjs`.
 */
export default class PluginLoader
{
   /**
    * Returns the any modules that cause a conflict.
    *
    * @returns {string[]} An array of conflicting packages.
    */
   static get conflictPackages() { return s_CONFLICT_PACKAGES; }

   /**
    * Returns the `package.json` module name.
    *
    * @returns {string} Package name.
    */
   static get packageName() { return s_PACKAGE_NAME; }

   /**
    * Returns the configured input plugin for `@rollup/plugin-node-resolve` and `@rollup/plugin-commonjs`.
    *
    * @returns {object[]} Rollup plugins
    */
   static getInputPlugin()
   {
      return [PNR.nodeResolve({ browser: true }), commonjs()];
   }

   /**
    * Wires up PluginLoader on the plugin eventbus.
    *
    * @param {object} ev - PluginInvokeEvent - The plugin event.
    *
    * @see https://www.npmjs.com/package/@typhonjs-plugin/manager
    *
    * @ignore
    */
   static async onPluginLoad(ev)
   {
      ev.eventbus.on('typhonjs:oclif:bundle:plugins:npm:input:get', PluginLoader.getInputPlugin, PluginLoader);
   }
}
