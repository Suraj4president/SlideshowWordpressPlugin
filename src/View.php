<?php

namespace My;

use Timber\Timber;

class View
{
  public static function render_admin_menu_page()
  {
    self::init();
    $tab = intval($_GET['tab'] ?? '1');
    $data = [
      'page_name' => 'ba-slideshow-plugin',
      'current_tab' => $tab,
      'current_tab_partial' => "tab_$tab.twig",
      'base_url' => plugins_url('assets/apps', BA_SLIDESHOW_PLUGIN_FILE),
      'my_env' => Config::getEnv(),
    ];
    Timber::render('main.twig', $data);
  }

  public static function render_slideshow()
  {
    self::init();
    $data = [
      'my_env' => Config::getEnv(),
      'base_url' => plugins_url('assets/apps', BA_SLIDESHOW_PLUGIN_FILE),
    ];
    Timber::render('ba_slideshow/dist/main.twig', $data);
  }

  protected static function init()
  {
    Timber::$locations = [
      __DIR__.'/views',
      __DIR__.'/../assets/apps',
    ];
    Timber::$dirname = 'views';
  }
}
