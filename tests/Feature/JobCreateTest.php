<?php

namespace Tests\Feature;

use Tests\TestCase;

class JobCreateTest extends TestCase
{
    public function test_guest_cannot_create_job(): void
    {
        $this->postJson('/api/jobs', [])->assertUnauthorized();
    }
}
