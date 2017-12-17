# Moved

Moved to : [https://github.com/KevCJones/ngx-simple-modal](https://github.com/KevCJones/ngx-simple-modal)


# Why?

We looked at the code and decided being an early days fork, we'd take the time to improve the code and the architectural decisions to our own tastes.

## Like what?

Some guiding principles used were :
- Seperate the concerns of JS and CSS
- Its not actually a bootstrap implementation, at the component level its agnostic so lets not name it Bootstrap
- Mixing Dialogue and Modal terminology. Its technically a modal system, from which you can implement a dialoge  but just as easily could implement an image modal!


## Migration notes

- The SimpleModal* naming convention replaces the older BootstrapModule + Dialogue* naming mixed convention
- The configuration was lightened:

### SimpleModalOptions 
```typescript
interface SimpleModalOptions {
  
  /**
  * Flag to close modal by click on backdrop (outside modal)
  * @type {boolean}
  */
  closeOnClickOutside?: boolean;

   /**
  * Flag to close modal by click on backdrop (outside modal)
  * @type {boolean}
  */
  closeOnEscape: boolean;
  
  /**
  * Class to put in document body while modal is open
  * @type {string}
  */
  bodyClass: string;

  /**
  * Class we add and remove from modal when we add it/ remove it
  * @type {string}
  */
  wrapperClass: string,
  /**
  * Time we wait while adding and removing to let animation play
  * @type {string}
  */
  animationDuration: number;
}
```
