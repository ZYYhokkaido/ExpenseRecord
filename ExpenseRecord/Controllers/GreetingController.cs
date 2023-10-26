using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Microsoft.AspNetCore.Authorization;
using ExpenseRecord.Api.Models;

namespace ExpenseRecord.Controllers;

[ApiController]
[Route("[controller]")]
public class GreetingController : ControllerBase
{
    static List<ExpenseRecordDto> expenseRecordList = new List<ExpenseRecordDto>()
    {

    };

    public GreetingController()
    {
        // expenseRecordList = new List<ExpenseRecordDto>();
        // var toDoItemDto = new ExpenseRecordDto
        // {
        //     Id = Guid.NewGuid().ToString(),
        //     Description = string.Empty,
        //     Type = string.Empty,
        //     Amount = 0,
        //     Date = string.Empty
        // };
        // expenseRecordList.Add(toDoItemDto);

    }

    [HttpGet]
    public List<ExpenseRecordDto> get()
    {
        return expenseRecordList;
    }

    [HttpPost]
    public List<ExpenseRecordDto> add([FromBody] ExpenseRecordCreateRequest expenseRecordCreateRequest)
    {
        var toDoItemDto = new ExpenseRecordDto
        {
            Id = Guid.NewGuid().ToString(),
            Description = expenseRecordCreateRequest.Description,
            Type = expenseRecordCreateRequest.Type,
            Amount = expenseRecordCreateRequest.Amount,
            Date = expenseRecordCreateRequest.Date,
        };
        // await _toDoItemService.CreateAsync(toDoItemDto);
        expenseRecordList.Add(toDoItemDto);
        return expenseRecordList;
    }

    [HttpDelete("{id}")]
    public bool delete(string id)
    {
        for (int index = 0; index < expenseRecordList.Count; index = index + 1)
        {
            if (expenseRecordList[index].Id == id)
            {
                expenseRecordList.RemoveAt(index);
                return true;
            }
        }
        return false;
    }

}