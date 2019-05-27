<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Student;

class StudentController extends Controller
{
    public function index()
    {
        return Student::all()->toJson();
//        return response()->json(Student::all(), 201);

    }

    public function show(Student $student)
    {
//        return $student;
        return response()->json($student, 201);

    }

    public function store(Request $request)
    {
        $student = Student::create($request->all());

        return response()->json($student, 201);
    }

    public function update(Request $request, Student $student)
    {
        $student->update($request->all());

        return response()->json($student, 200);
    }

    public function delete(Student $student)
    {
        $student->delete();
        return response()->json(null, 204);
    }
}
