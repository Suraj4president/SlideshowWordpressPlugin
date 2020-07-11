<?php

namespace My;

class Api
{
  public static function get_all_routes()
  {
    return [
      'session_answers_update',
    ];
  }

  public static function handle_requests()
  {
    $route = $_POST['my_api_route'] ?? null;
    if (!$route) {
      return false;
    }

    if (in_array($route, self::get_all_routes())) {
      $method = "route_$route";
      self::verify_nonce();
      self::$method();
    } else {
      $data = [
        'error' => "Invalid route: $route",
      ];
      wp_send_json($data, 400);
    }
  }

  public static function route_session_answers_update()
  {
    $sessionAnswers = $_POST['my_session_answers'] ?? null;
    try {
      $newValue = self::save_slideshow_session_answers($nonce, $sessionAnswers);
      $result = [
        'data' => $newValue,
      ];
      wp_send_json($result);
    } catch (\Exception $e) {
      $result = [
        'error' => true,
        'message' => $e->getMessage(),
      ];
      wp_send_json($result, 400);
    }
  }

  private static function verify_nonce()
  {
    $nonce = $_POST['my_nonce'] ?? null;
    if (wp_verify_nonce($nonce, 'my_nonce') === false) {
      $data = [
        'error' => 'form token is invalid',
      ];
      wp_send_json($data, 401);
    }
  }

  private static function save_slideshow_session_answers($nonce, $sessionAnswers)
  {
    $optionName = 'testrun_slideshow_answers';
    $oldValue = get_option($optionName);

    if ($oldValue !== false) {
        // The option already exists, so update it.
        $newValue = $oldValue;
        $newValue[] = $sessionAnswers;
        update_option($optionName, $newValue);
    } else {
      // The option hasn't been created yet, so add it with $autoload set to 'no'.
      $deprecated = null;
      $autoload = 'no';
      $newValue = [];
      $newValue[] = $sessionAnswers;
      add_option($optionName, $newValue, null, $autoload );
    }

    return $newValue;
  }
}
