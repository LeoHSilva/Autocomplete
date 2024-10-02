1. What is the difference between Component and Pure Component? Give an example where it might break my app.

  A `Component` will always trigger a re-render when a prop or state change, while a `PureComponent` can do a shallow comparison, which can be used to prevent unnecessary re-renders.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

  Because of the possible conflicts that might happen. For an example, if a `Context` updates it's values, it would then cause components to re-render, but if a `shouldComponentUpdate` is "hit" it might prevent the re-rendering of a `Component`, which could create unexpected behavior.

3. Describe 3 ways to pass information from a component to its PARENT.

  1. By using `Callback` functions provided by the parent
  2. By using `Context` components
  3. By using `Events` emitters and listeners 

4. Give 2 ways to prevent components from re-rendering.

  One way (which I use and prefer), is by using `memo`, because a little bit similar to `shouldComponentUpdate`, it memoize the functional component and only re-renders when a prop is changed. The other way is by using the component from question 2, `shouldComponentUpdate`.

5. What is a fragment and why do we need it? Give an example where it might break my app.

  `Fragment` is a wrapper that allow us to have multiple elements grouped together without adding extra nodes like `<div>`. 
  Here's a way where using `Fragment` would break
  ```jsx
  import React, {Fragment} from 'react';

  const Example = () => {
    return (
      <Fragment>
        <h1>Title</h1>
        <p>Paragraph</p>
      </Fragment>
    );
  };

  const App = () => {
    return (
      <div className="container">
        <Example />
      </div>
    );
  };
  ```
  In case we have a css class like `.container > div`, `<Example />` wouldn't be affected it, so we'd have to change `<Fragment>` with a `<div>` element.

6. Give 3 examples of the HOC pattern.

  1. Theme handling
  ```jsx
  const withTheme = (WrappedComponent) => {
    return (props) => {
      const theme = {
        primaryColor: 'blue',
        secondaryColor: 'green',
      };
      return <WrappedComponent theme={theme} {...props} />;
    };
  };

  const ThemedComponent = ({ theme }) => (
    <div style={{ color: theme.primaryColor }}>Text</div>
  );
  const ThemedComponentWithTheme = withTheme(ThemedComponent);
  ```

  2. Error Boundary
  ```jsx
  const withLogging = (WrappedComponent) => {
    return (props) => {
      useEffect(() => {
        console.log('props:', props);
      }, [props]);

      return <WrappedComponent {...props} />;
    };
  };

  const MyComponent = (props) => <div>{props.message}</div>;
  const MyComponentWithLogging = withLogging(MyComponent);

  <MyComponentWithLogging message="Teeest" />;
  ```

  3. Data Loader
  ```jsx
  const withDataFetching = (url) => (WrappedComponent) => {
    return (props) => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const result = await response.json();
            setData(result);
            setLoading(false);
          } catch (error) {
            setError(error);
            setLoading(false);
          }
        };

        fetchData();
      }, [url]);

      return (
        <WrappedComponent
          data={data}
          loading={loading}
          error={error}
          {...props}
        />
      );
    };
  };
  
  const Pokemdex = ({ data, loading, error }) => {
    if (loading) return (<p>Loading...</p>);
    if (error) return (<p>{error}</p>);

    return (
        <div className="suggestion-box">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => (
              <div key={index} onClick={() => handleClick(suggestion)} className="suggestion-item">
                {getHighlightedText(suggestion.name, inputValue)}
              </div>
            ))
          ) : (
            <span>No suggestions available</span>
          )}
        </div>
      )
  }

  const PokedexWithData = withDataFetching('https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0')(Pokemdex);  
  ```

7. What's the difference in handling exceptions in promises, callbacks and async...await?

  - Callbacks: Error handling is done through "error-first" callback functions
  - Promises: Errors are handled using `.catch()`
  - async/await: Uses `try...catch` for clean error handling

8. How many arguments does setState take and why is it async.

  It can take up to two arguments, one for the new `state` and another for a callback. `setState` is asynchronous for performance reasons, so that it may "group" multiple calls that did not complete just yet

9. List the steps needed to migrate a Class to Function Component.

  1. Replace the class declaration with a function declaration.
  2. Replace methods that depend on `events` with `useEffect`
  3. Replace state and constructor with `useState`
  4. Change methods to functions
  6. Adjust input `props`
  5. Remove any "rogue" `this` references left
  7. Replace `render` with a `return`

10. List a few ways styles can be used with components. 

  1. A "big" CSS Stylesheet that cam be imported on the root of the App and then include add the attribute `className` with the required css class name to any element/component
  2. We can directly apply a style to the component by passing raw CSS styles to the `style` attribute
  3. Adding individual Stylesheets as the component may require

11. How to render an HTML string coming from the server.

  To render an HTML string coming from the server in a React component, we could use the `dangerouslySetInnerHTML` attribute, but as the name suggests, it's very dangerous to the security of the App.
  We can use it like so:
  ```jsx
  <div
    dangerouslySetInnerHTML={{ __html: htmlString }}
  />
  ```