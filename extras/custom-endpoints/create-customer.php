<?php

use Directus\Application\Http\Request;
use Directus\Application\Http\Response;
use Directus\Services\ItemsService;

return [
  // The endpoint path:
  // '' means it is located at: `/custom/<endpoint-id>`
  // '/` means it is located at: `/custom/<endpoint-id>/`
  // 'test' and `/test` means it is located at: `/custom/<endpoint-id>/test
  // if the handler is a Closure or Anonymous function, it's binded to the app container. Which means $this = to the app container.
  '' => [
    'method' => 'GET',
    'handler' => function (Request $request, Response $response) {

       // Get all answers from DB
      $itemsService = new ItemsService($this);

      $params = $request->getQueryParams();
      $programs = $itemsService->findAll('items', $params);


      return $response->withJson([
          'data' => [
              $programs
          ]
      ]);
    }
  ]
];