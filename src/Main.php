<?php

namespace My;

use Dotenv\Dotenv;

class Main
{
  public function __construct()
  {
    $this->initDotenv();
    $this->initWpStuff();
  }

  private function initDotEnv()
  {
    $dotenv = Dotenv::create(__DIR__.'/../');
    $dotenv->load();
  }

  private function initWpStuff()
  {
    add_action('init', [$this, 'init_cb']);
    add_action('admin_head', [$this, 'admin_head_cb']);
    add_action('admin_init', [$this, 'admin_init_cb']);
    add_action('admin_menu', [$this, 'admin_menu_cb']);
    add_action('admin_enqueue_scripts', [$this, 'admin_enqueue_scripts_cb']);
  }

  public function init_cb()
  {
    add_shortcode('ba_slideshow', ['\My\View', 'render_slideshow']);
    Api::handle_requests();
  }

  public function admin_init_cb()
  {
    // do something
  }

  public function admin_menu_cb()
  {
    Actions::add_admin_menu();
  }

  public function admin_enqueue_scripts_cb($hook)
  {
    Actions::register_and_load_assets($hook);
  }

  public function admin_head_cb()
  {
    Actions::add_inline_js_script();
  }
}
