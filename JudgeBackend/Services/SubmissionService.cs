
using System.ComponentModel;
using System.Text.Json;
using JudgeBackend.Data;
using JudgeBackend.Models;

namespace JudgeBackend.Services
{
    public class SubmissionService : ISubmissionService
    {
        private readonly ApplicationDbContext _context;
        public SubmissionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task<bool> DeleteSubmissionAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<SubmissionDTO>> GetAllSubmissionsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<SubmissionDTO?> GetSubmissionByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<SubmissionDTO>> GetSubmissionsByLabIdAsync(int labId)
        {
            throw new NotImplementedException();
        }

        public async Task<JudgeResponse> SubmitLabAsync(SubmissionCreate submissionDto)
        {
            var lab = await _context.Labs.FindAsync(submissionDto.LabID);
            if (lab == null) throw new Exception("Lab not found");
            
            var source_code = ExtractCodeFromSubmissionFileAsync(submissionDto.SourceFile);
            if (source_code == null) throw new Exception("Source code not found");

            JudgeRequest request = new JudgeRequest
            {
                SourceCode = source_code,
                Language = submissionDto.Language!,
                Input = lab.Input,
                ExpectedOutput = lab.ExpectedOutput
            };

            using (var httpClient = new HttpClient())
            {
                // Send Request to JudgeAPI
                var response = await httpClient.PostAsJsonAsync("http://localhost:5000/submit", request);
                if (!response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    throw new Exception($"API call failed. Response: {responseContent}");
                }

                // Capture the result
                var jsonResult = JsonSerializer.Deserialize<Dictionary<string, string>>(await response.Content.ReadAsStringAsync());
                Console.WriteLine($"Result >> {jsonResult?["Result"]}");
                Console.WriteLine($"STD_ERR >> {(jsonResult?.TryGetValue("std_err", out var std_err) == true ? std_err : "N/A")}");
                Console.WriteLine($"STD_OUT >> {(jsonResult?.TryGetValue("std_out", out var std_out) == true ? std_out : "N/A")}");

                if (jsonResult?["Result"] == null)
                    throw new Exception("No result was found! Aborting...");

                // TODO: Handle error correctly
                // * Currently the code submitted doesnt work and we need to fix this
                // * CURL request works though??

                switch (jsonResult?["Result"])
                {
                    case "Success":
                        return new JudgeResponse
                        {
                            Result = SubmissionResult.Success,
                            source_code = request.SourceCode,
                            exit_code = 0,
                            submittedAt = DateTime.Now,
                            labID = lab.ID,
                        };
                    case "Error":
                        return new JudgeResponse
                        {
                            Result = SubmissionResult.Error,
                            source_code = request.SourceCode,
                            exit_code = 1,
                            submittedAt = DateTime.Now,
                            labID = lab.ID,
                            std_err = jsonResult["std_err"]
                        };
                    case "Incorrect":
                        return new JudgeResponse
                        {
                            Result = SubmissionResult.Failed,
                            source_code = request.SourceCode,
                            exit_code = 2,
                            submittedAt = DateTime.Now,
                            labID = lab.ID,
                        };
                    default:
                        return new JudgeResponse
                        {
                            Result = SubmissionResult.Error,
                            source_code = "you shouldnt be seeing this",
                            exit_code = 3,
                            submittedAt = DateTime.Now,
                            labID = lab.ID
                        };
                }
            };
            

            throw new Exception("Nah jk");
        }

        private string ExtractCodeFromSubmissionFileAsync(IFormFile file)
        {
            using var reader = new StreamReader(file.OpenReadStream());
            return reader.ReadToEnd();
        }
    }
}