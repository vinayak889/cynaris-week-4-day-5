<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Job extends Model
{
    protected $fillable = ['recruiter_id','title','company','location','employment_type','description','salary_range','category','status'];

    public function recruiter(): BelongsTo { return $this->belongsTo(User::class, 'recruiter_id'); }
    public function applications(): HasMany { return $this->hasMany(Application::class); }
}
