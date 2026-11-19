<?php

namespace Tests\Feature;

use Tests\TestCase;

class JobListingTest extends TestCase
{
    public function test_job_list_api_returns_successful_response(): void
    {
        $this->getJson('/api/jobs')->assertOk()->assertJsonStructure(['data']);
    }
}
