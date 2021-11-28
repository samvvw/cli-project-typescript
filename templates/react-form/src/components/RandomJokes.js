import React from 'react'

export default function RandomJokes({ jokes, loading }) {
    return (
        <div>
            <h2>RandomJokes</h2>
            <div>
                {loading
                    ? 'Loading....'
                    : jokes?.map((joke, i) => (
                          <div key={i}>
                              <p>
                                  <span>{i + 1}. </span>
                                  {joke.setup}
                              </p>
                              <blockquote>
                                  <pre>{joke.punchline}</pre>
                              </blockquote>
                          </div>
                      ))}
            </div>
        </div>
    )
}
