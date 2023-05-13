{ pkgs, ... }:

{
  # https://devenv.sh/packages/
  packages = [ pkgs.docker-compose ];

  languages.javascript.enable = true;
}
