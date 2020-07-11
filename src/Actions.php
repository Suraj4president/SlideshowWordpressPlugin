<?php

namespace MY;

class Actions
{
  public static function add_inline_js_script()
  {
    $jsData = [
      'baseUrl' => plugins_url('assets/apps/ba_slideshow', BA_SLIDESHOW_PLUGIN_FILE),
      'ajaxUrl' => admin_url('admin-ajax.php'),
      'nonce' => wp_create_nonce('my_nonce'),
    ];
    $script = "";
    $script .= "<script>" . PHP_EOL;
    $script .= "window.ba_slideshow_data = " . json_encode($jsData) . ";" . PHP_EOL;
    $script .= "</script>" . PHP_EOL;
    echo $script;
  }

  public static function add_admin_menu()
  {
    add_menu_page('BA Slideshow Plugin', 'BA Slideshow Plugin', 'manage_options', 'ba-slideshow-plugin', '\My\View::render_admin_menu_page', 'dashicons-schedule', 3);
  }

  public static function register_and_load_assets($hook)
  {
    // Load only on ?page=sample-page
    if ( $hook != 'toplevel_page_ba-slideshow-plugin' ) {
      return;
    }

    // Register stuff
    wp_register_style('ba-slideshow-plugin-css-1', plugins_url('assets/css/main.css', BA_SLIDESHOW_PLUGIN_FILE));
    wp_register_script('ba-slideshow-plugin-js-1', plugins_url('assets/js/main.js', BA_SLIDESHOW_PLUGIN_FILE));

    // Load stuff
    wp_enqueue_style( 'ba-slideshow-plugin-css-1' );
    wp_enqueue_script( 'ba-slideshow-plugin-js-1' );
  }
}
