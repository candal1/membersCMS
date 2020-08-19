<?php

use Directus\Application\Http\Request;
use Directus\Application\Http\Response;

\Stripe\Stripe::setApiKey('sk_test_51HEQkFFATtdUWzuwba42aDaKlqrR5b51yQirkLxoanhEtX0EPn1ztGZuj8l7PY7w7JNvMLW7XbjEpuzIUS1IklfZ00qM7NX37m');

return [
  '' => [
    'group' => true,
    'endpoints' => [
      '/create-customer' => [
        'method' => 'POST',
        'handler' => function (Request $request, Response $response, array $args) {

              $body = json_decode($request->getBody());
//              $itemsService = new ItemsService($this);

              $stripe = $this->stripe;
              // Create customer in stripe
              $customer = $stripe->customers->create([
                'email' => $body->email
              ]);
              // Associate user data with directus user_data for userid
//              $payload = array("id" => $body->id, "stripe_id" => $customer->id, "access_status" => "Inactive", "directus_user" => $body.id);
//              $itemsService->createItem('user_data', $payload);

              return $response->withJson(['customer' => $customer]);
        }
      ],
    ]
  ]
];
