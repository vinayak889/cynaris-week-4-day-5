<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobResource;
use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index()
    {
        return JobResource::collection(Job::where('status', 'published')->latest()->paginate(10));
    }

    public function show(Job $job)
    {
        return new JobResource($job);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:150',
            'company' => 'required|string|max:150',
            'location' => 'required|string|max:150',
            'employment_type' => 'required|string',
            'description' => 'required|string',
            'salary_range' => 'nullable|string|max:100',
            'category' => 'required|string|max:80',
        ]);
        $data['recruiter_id'] = $request->user()->id;
        $data['status'] = 'draft';
        $job = Job::create($data);
        return (new JobResource($job))->response()->setStatusCode(201);
    }

    public function update(Request $request, Job $job)
    {
        abort_unless($job->recruiter_id === $request->user()->id, 403);
        $data = $request->validate([
            'title' => 'sometimes|required|string|max:150',
            'company' => 'sometimes|required|string|max:150',
            'location' => 'sometimes|required|string|max:150',
            'description' => 'sometimes|required|string',
            'status' => 'sometimes|required|in:draft,published,closed',
        ]);
        $job->update($data);
        return new JobResource($job);
    }

    public function destroy(Request $request, Job $job)
    {
        abort_unless($job->recruiter_id === $request->user()->id, 403);
        $job->delete();
        return response()->json(['message' => 'Job deleted successfully'], 200);
    }
}
