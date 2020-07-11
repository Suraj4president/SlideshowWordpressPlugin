<?php

namespace My;

class Config
{
  public static function getEnv()
  {
    return getenv('MY_ENV') ?? 'production';
  }
}
