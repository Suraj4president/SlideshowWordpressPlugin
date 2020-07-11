<?php

namespace My;

class AdminNotices
{
  const SUCCESS = 'success';
  const ERROR = 'error';

  public static function add($msg, $type=self::ERROR)
  {
    $types = [self::SUCCESS, self::ERROR];
    if (!in_array($type, $types)) {
      throw new \InvalidArgumentException("Incorrect argument for type: '$type' given.");
    }
    $cb = self::createCb($msg, $type);
    add_action('admin_notices', $cb);
  }

  protected static function createCb($msg, $type)
  {
    return function() use($msg, $type) {
      printf('<div class="notice notice-%s">%s</div>', $type, $msg);
    };
  }
}

