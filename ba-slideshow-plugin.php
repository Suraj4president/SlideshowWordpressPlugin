<?php

/**
 * Plugin Name: BA Slideshow Plugin
 * Description: An example
 * Author: Chk
 */

defined('ABSPATH') || exit;

if (!defined('BA_SLIDESHOW_PLUGIN_FILE')) {
  define('BA_SLIDESHOW_PLUGIN_FILE', __FILE__);
}

if (file_exists($composer_autoload = __DIR__ . '/vendor/autoload.php')) {
  require_once $composer_autoload;
}

new \My\Main();
