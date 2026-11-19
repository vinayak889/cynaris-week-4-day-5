<?php

namespace Tests\Feature;

use Tests\TestCase;

class ApplicationTest extends TestCase
{
    public function test_candidate_application_requires_authentication(): void
    {
        $this->postJson('/api/applications', [])->assertUnauthorized();
    }
}
