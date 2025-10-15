// This is a generated file. Do not modify manually.
import type { PluginDefinition } from '@alfons-app/pdk';
import pkg1 from '@jaroslav-vondrak/bar-chart/editor';

const packages: { [pkgName: string]: PluginDefinition } = {
  '@jaroslav-vondrak/bar-chart': pkg1,
} as const;

const resolvablePackages = new Set([]);

const { Library, controls, commands } = Object.entries(packages).reduce(
  (acc, [pkgName, pkg]) => {
    const { controls, commands, ...definition } = pkg;
    const stripScope = type => (typeof type === 'string' ? type.replace(/^@[^/]+\//, '') : '');

    if ('schema' in definition && !stripScope(pkgName).startsWith('flags-')) {
      acc.Library[pkgName] = {
        ...definition,
        _isResolvable: resolvablePackages.has(pkgName),
      };
    }

    if (controls) {
      for (const [controlName, Control] of Object.entries(controls))
        acc.controls[`${pkgName}:${controlName}`] = Control;
    }

    if (commands) {
      for (const [commandName, Command] of Object.entries(commands))
        acc.commands[`${pkgName}:${commandName}`] = Command;
    }
    
    return acc;
  },
  { Library: {}, controls: {}, commands: {} },
);

export default Library;

export { controls, commands };
