import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://hackathon-poc-france-central-2.openai.azure.com/openai/deployments/t3-bing-search/chat/completions';
  private apiKey = '6847f8ec317543779af3f15c835cf58f';
  private apiVersion = '2023-03-15-preview';

  constructor(private http: HttpClient) { }

  public getChatCompletions(message:any) {
    const url = this.apiUrl;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'api-key': this.apiKey
    });

    const body = {
      messages: [
        {
          role: 'system',
          content: message
        }
      ],
      max_tokens: 800,
      temperature: 0.7,
      frequency_penalty: 0,
      presence_penalty: 0,
      top_p: 0.95,
      stop: null
    };

    return this.http.post(url, body, { headers: headers, params: { 'api-version': this.apiVersion } });
  }
}
