<?php

namespace Tests\Feature;

use Tests\TestCase;

class JobDeleteTest extends TestCase
{
    public function test_guest_cannot_delete_job(): void
    {
        $this->deleteJson('/api/jobs/1')->assertUnauthorized();
    }
}
