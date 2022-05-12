from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from .models import Departments, Employees
from .serializers import DepartmentSerializer, EmployeeSerializer


@csrf_exempt
def department_api(request, dep_id=0):
    if request.method == 'GET':
        departments = Departments.objects.all()
        # [(1, 'Dep-1'), (2, 'Dep-2'), ...]
        departments_serializer = DepartmentSerializer(departments, many=True)
        return JsonResponse(departments_serializer.data, safe=False)
        # [{"DepartmentId": 1, "DepartmentName": "Dep-1"}, {"DepartmentId": 2, "DepartmentName": "Dep-2", ...}]

    elif request.method == 'POST':
        department_data = JSONParser().parse(request)
        department_serializer = DepartmentSerializer(data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse('Department has been Added successfully', safe=False)
        else:
            return JsonResponse('Failed to Add the Department', safe=False)

    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        department = Departments.objects.get(DepartmentId=dep_id)
        department_serializer = DepartmentSerializer(department, data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse('Department has been Updating successfully', safe=False)
        else:
            return JsonResponse('Failed to Updating the Department', safe=False)

    elif request.method == 'DELETE':
        department = Departments.objects.get(DepartmentId=dep_id)
        department.delete()
        return JsonResponse('Department has been Deleted successfully', safe=False)


@csrf_exempt
def employee_api(request, emp_id=0):
    if request.method == 'GET':
        employees = Employees.objects.all()
        # [(1, 'Dep-1'), (2, 'Dep-2'), ...]
        employees_serializer = EmployeeSerializer(employees, many=True)
        return JsonResponse(employees_serializer.data, safe=False)

    elif request.method == 'POST':
        employee_data = JSONParser().parse(request)
        employee_serializer = EmployeeSerializer(data=employee_data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse('Employee has been Added successfully', safe=False)
        else:
            return JsonResponse('Failed to Add the Employee', safe=False)

    elif request.method == 'PUT':
        employee_data = JSONParser().parse(request)
        employee = Employees.objects.get(EmployeeId=emp_id)
        employee_serializer = EmployeeSerializer(employee, data=employee_data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse('Employee has been Updating successfully', safe=False)
        else:
            return JsonResponse('Failed to Updating the Employee', safe=False)

    elif request.method == 'DELETE':
        employee = Employees.objects.get(EmployeeId=emp_id)
        employee.delete()
        return JsonResponse('Employee has been Deleted successfully', safe=False)


@csrf_exempt
def save_file(request):
    file = request.FILES['myFile']
    file_name = default_storage.save(file.name, file)
    return JsonResponse(file_name, safe=False)












