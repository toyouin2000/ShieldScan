export function parseDependencies(
  packageJson: any
) {
  const dependencies = [];

  const deps =
    packageJson.dependencies || {};

  for (const [name, version] of Object.entries(
    deps
  )) {
    dependencies.push({
      name,
      version: String(version),
    });
  }

  return dependencies;
}