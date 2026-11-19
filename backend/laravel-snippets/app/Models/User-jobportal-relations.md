# Add relationships to User model

Add these methods to your existing `App\Models\User` model:

```php
public function postedJobs()
{
    return $this->hasMany(\App\Models\Job::class, 'recruiter_id');
}

public function applications()
{
    return $this->hasMany(\App\Models\Application::class, 'candidate_id');
}
```

Role/authorization middleware and policies should be implemented in the real Laravel app. Do not rely only on hiding UI controls.
