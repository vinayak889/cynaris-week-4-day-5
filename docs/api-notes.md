# API Notes (Starter)

| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| GET | `/api/jobs` | List published jobs (paginated) | Public |
| GET | `/api/jobs/{job}` | Job details | Public |
| POST | `/api/jobs` | Create a job draft | Sanctum |
| PUT | `/api/jobs/{job}` | Update a recruiter-owned job | Sanctum |
| DELETE | `/api/jobs/{job}` | Delete recruiter-owned job | Sanctum |

Example JSON create request:
```json
{
  "title": "Frontend Developer",
  "company": "Example Company",
  "location": "Bengaluru",
  "employment_type": "Full-time",
  "description": "Build responsive web interfaces.",
  "salary_range": "₹5-8 LPA",
  "category": "Engineering"
}
```
Authentication, role authorization, and application-submission endpoints need to be implemented and verified in the actual Laravel app before production use.
